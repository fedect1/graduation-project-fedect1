class Comment {
  date = new Date()
  constructor(author, comment) {
    this.author = author
    this.comment = comment
  }
  static create({ comment }) {
    const newComment = new Comment(comment)
    Comment.list.push(newComment)
    return newComment
  }
  static list = []
}

module.exports = Comment
