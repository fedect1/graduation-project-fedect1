const Comment = require('./comment')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  bodyPost: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  date: Date,
  expirationDate: Date,
  status: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
class Post {
  //date = new Date()
  //expirationDate = new Date(this.date.getTime() + 3 * 60 * 60 * 1000)
  //status = true

  createComment(author, comment) {
    const newComment = Comment.create({ author, comment })
    this.comments.push(newComment)
    this.expirationDate = new Date(this.expirationDate.getTime() + 15 * 60 * 1000) //refactor
    return newComment
  }

  addDeleteComment(index) {
    if (index >= 0 && index <= this.comments.length) {
      this.expirationDate = new Date(this.expirationDate.getTime() - 15 * 60 * 1000) //refactor
      return this.comments.splice(indexPost, 1)
    }
  }

  addLike(author) {
    //addLikeBy
    this.likes.push(author.profile.userName)
    this.expirationDate = new Date(this.expirationDate.getTime() + 5 * 60 * 1000)
  }

  deleteLike(author) {
    //removeLikeFrom
    const indexOfAuthor = this.interaction.following.indexOf(author.profile.userName)
    if (indexOfAuthor !== -1) {
      this.interaction.following.splice(indexOfAuthor, 1)
      return (this.expirationDate = new Date(this.expirationDate.getTime() - 5 * 60 * 1000))
    }
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
