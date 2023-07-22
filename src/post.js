const Comment = require('./comment')
class Post {
  comments = []
  likes = []
  date = new Date()
  expirationDate = new Date(this.date.getTime() + 3 * 60 * 60 * 1000)
  status = true

  constructor(message) {
    this.message = message
  }

  addComment(author, comment) {
    const newComment = new Comment(author.profile.userName, comment)
    this.comments.push(newComment)
    this.expirationDate = new Date(this.expirationDate.getTime() + 15 * 60 * 1000)
  }

  addDeleteComment(index) {
    if (index >= 0 && index <= this.comments.length) {
      this.expirationDate = new Date(this.expirationDate.getTime() - 15 * 60 * 1000)
      return this.comments.splice(indexPost, 1)
    }
  }

  addLike(author) {
    this.likes.push(author.profile.userName)
    this.expirationDate = new Date(this.expirationDate.getTime() + 5 * 60 * 1000)
  }

  deleteLike(author) {
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
        : this.comments.map((el, i) => `${i + 1}- ${el.author}: ${el.comment}`).join('\n')
    return `--- Comments ---\n${commentsByString}`
  }

  get allLikes() {
    const likesByString =
      this.likes.length === 0 ? 'No likes yet' : this.likes.map((el, i) => `${i + 1}- ${el}`).join('\n')
    return `--- Likes ---\n${likesByString}\n`
  }
}

module.exports = Post
