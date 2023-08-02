const Post = require('./post')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  email: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', autopopulate: true }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  description: String,
  profilePictureURL: String,
})

userSchema.plugin(autopopulate)
class User {
  // Create post
  async createPost(bodyPost) {
    const newPost = await Post.create({ bodyPost, user: this._id })
    this.posts.push(newPost)
    await this.save()
    return newPost
  }

  //Delete post
  async deletePost(postId) {
    const postIndex = this.posts.findIndex(post => post._id.toString() === postId)
    if (postIndex === -1) {
      return res.status(404).send({ message: 'Post not found in user' })
    }
    this.posts.splice(postIndex, 1)
    await this.save()
  }

  //Follow
  async follow(user) {
    this.following.push(user)
    await this.save()
    user.followedBy.push(this)
    await user.save()
    return this
  }

  unfollow(user) {
    const followedIndex = this.following.findIndex(followed => followed._id.toString() === user._id.toString())
    if (followedIndex === -1) {
      return res.status(404).send({ message: 'User not found in following' })
    }
    this.following.splice(followedIndex, 1)
    user.followedBy.splice(user.followedBy.indexOf(this._id), 1)
    this.save()
    user.save()
    return this
  }
  // Date formating
  datePostFormat(datePost) {
    const calcDaysPassed = datePost => {
      const currentDate = new Date()
      const daysPassed = Math.round(Math.abs(currentDate - datePost) / (1000 * 60 * 60 * 24))
      return daysPassed
    }
    const daysPassed = calcDaysPassed(datePost)

    if (typeof datePost !== 'object') return 'Invalid date format'
    if (daysPassed === 0) return 'Today'
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed < 7) return `${daysPassed} days ago`
    if (daysPassed) return `${Math.floor(daysPassed / 7)} weeks ago`
  }

  dateExpirationFormat(dateExpPost) {
    const calcTime = dateExpPost => {
      const currentDate = new Date()
      const timeDifferenceInSeconds = Math.abs(dateExpPost - currentDate) / 1000

      const hours = Math.floor(timeDifferenceInSeconds / 3600)
      const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)
      const seconds = Math.floor(timeDifferenceInSeconds % 60)

      return `Time left: ${hours}:${minutes}:${seconds}`
    }

    const expirationTime = calcTime(dateExpPost)
    return expirationTime
  }

  // Show info getters
  get profileInfo() {
    return `\n --- PROFILE INFO ---\n Username: ${this.profile.userName}\n Email: ${this.email}\n Description: ${this.profile.description}\n Profile picture URL: ${this.profile.profilePictureURL}`
  }
  get interactionInfo() {
    const followedByString =
      this.interaction.followedBy.length === 0
        ? 'There are no followers'
        : this.interaction.followedBy.map((el, i) => `${i + 1}- ${el}`).join('\n') //rename //Wrap into a function
    const followingString =
      this.interaction.following.length === 0
        ? 'Does not follow anyone'
        : this.interaction.following.map((el, i) => `${i + 1}- ${el}`).join('\n')
    return `\n --- INTERACTION ---\n Followed by:\n${followedByString}\n Following:\n${followingString}`
  }
  get postsInfo() {
    const postByString =
      this.posts === 0
        ? 'Has not published post'
        : this.posts
            .map(
              (
                el,
                i //rename
              ) =>
                `Posted: ${this.datePostFormat(el.date)}\n
        Status: ${el.status ? 'Visible' : 'Expired'}\n
        ${el.status ? this.dateExpirationFormat(el.expirationDate) : ''}\n
        Post: ${el.message}\n
        ${el.allComments}\n
        ${el.allLikes}`
            )
            .join('\n')
    return `--- POSTS ---\n ${postByString}`
  }
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
