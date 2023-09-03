const Post = require('./post')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', autopopulate: { maxDepth: 1 }}],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { maxDepth: 1 } }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { maxDepth: 1 } }],
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

  async unfollow(user) {
    this.following.pull(user)
    user.followedBy.pull(this)
    await this.save()
    await user.save()
    return this
  }

}

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
