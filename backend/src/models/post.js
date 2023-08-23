const mongoose = require('mongoose')

const expitartionTime = 3 * 15 * 60 * 1000
const commentTimeExtension = 15 * 60 * 1000
const likeTimeExtension = 5 * 60 * 1000
const postSchema = new mongoose.Schema({
  body: String,
  comments: [],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: function () {
      return new Date(this.createdAt.getTime() + expitartionTime)
    },
  },
  status: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
class Post {
  async createComment(author, text) {
    this.comments.push({ author, text })
    this.expirationDate = new Date(this.expirationDate.getTime() + commentTimeExtension)
    await this.save()
    return this
  }

  async deleteComment(index) {
    this.comments.splice(index, 1)
    this.expirationDate = new Date(this.expirationDate.getTime() - commentTimeExtension)
    await this.save()
    return this
  }

  async addLike(author) {
    //addLikeBy
    this.likes.push(author)
    this.expirationDate = new Date(this.expirationDate.getTime() + likeTimeExtension)
    await this.save()
    return this
  }

  async deleteLike(user) {
    console.log(user)
    this.likes = this.likes.filter(like => like.toString() !== user)
    console.log(this.likes)
    this.expirationDate = new Date(this.expirationDate.getTime() - likeTimeExtension)
    await this.save()
    return this
  }

  get allComments() {
    const commentsByString =
      this.comments.length === 0
        ? '** No comments yet **'
        : this.comments.map((el, i) => `${i + 1}- ${el.author}: ${el.comment}`).join('\n') //refactor
    return `--- Comments ---\n${commentsByString}`
  }

  get allLikes() {
    const likesByString =
      this.likes.length === 0 ? 'No likes yet' : this.likes.map((el, i) => `${i + 1}- ${el}`).join('\n') //refactor
    return `--- Likes ---\n${likesByString}\n`
  }
}
postSchema.loadClass(Post)
module.exports = mongoose.model('Post', postSchema)
