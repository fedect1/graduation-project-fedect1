const Post = require('./post')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', autopopulate: true }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  avatar: { type: String, default: '' },
})

userSchema.plugin(autopopulate)
class User {
  // Create post
  async createPost(bodyPost) {
    const newPost = await Post.create({ body: bodyPost, user: this._id })
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
}

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
