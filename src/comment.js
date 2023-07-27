class Comment {
  date = new Date()
  constructor(author, comment) {
    this.author = author
    this.comment = comment
  }
  static create({ author, comment }) {
    const newComment = new Comment(author, comment)
    Comment.list.push(newComment)
    return newComment
  }
  static list = []
}

module.exports = Comment
