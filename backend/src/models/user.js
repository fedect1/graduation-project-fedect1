const Post = require('./post')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  //posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', autopopulate: { maxDepth: 1 }}],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] ,
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] ,
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  avatar: { type: String, default: '' },
  },
  {
    toJSON : { virtuals: true },
    toObject: { virtuals: true }
  }
)

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user'
});

userSchema.plugin(autopopulate)
class User {
  // Create post
  async createPost(bodyPost) {
    const newPost = await Post.create({ body: bodyPost, user: this._id })
    await this.save()
    return newPost
  }

  //Delete post //Update post


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
