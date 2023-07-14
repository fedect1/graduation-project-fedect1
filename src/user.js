const Post = require('./post')

class User {
  constructor(name, username, email, location, age) {
    this.name = name
    this.username = username
    this.email = email
    this.location = location
    this.age = age
    this.collectionPost = []
  }

  post(date, hour, message) {
    const newPost = new Post(date, hour, message)
    this.collectionPost.push(newPost)
  }

  get info() {
    return `\n${this.name} is in ${this.location}.\nHe/She/They registered with the following data\n- email: ${
      this.email
    }\n- Date of birth: ${this.age}\n- Username: ${
      this.username
    }\n\nHe/She/They posted the following messages:${this.collectionPost
      .map((post, i) => {
        return `\n\n*****  Post number: ${i + 1}  *****\nDate: ${post.date}\nHour: ${post.hour}\nMessage: ${
          post.message
        }`
      })
      .join('')}`
  }
}

module.exports = User
