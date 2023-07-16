const Post = require('./post')

class User {
  constructor(name, username, email, password) {
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.collectionPost = []
  }

  post(date, hour, message) {
    const newPost = new Post(date, hour, message)
    this.collectionPost.push(newPost)
  }

  deletePost(indexPost) {
    if (indexPost >= 0 && indexPost < this.collectionPost.length) {
      this.collectionPost.splice(indexPost, 1)
    }
  }

  get info() {
    return `\n${this.name}.\nHe/She/They registered with the following data\n- email: ${this.email}\n- Password: ${
      this.password
    }\n- Username: ${this.username}\n\nHe/She/They posted the following messages:${this.collectionPost
      .map((post, i) => {
        return `\n\n*****  Post number: ${i}  *****\nDate: ${post.date}\nHour: ${post.hour}\nMessage: ${post.message}`
      })
      .join('')}`
  }
}

module.exports = User
