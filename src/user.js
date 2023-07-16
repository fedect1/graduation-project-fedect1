const Post = require('./post')
const passwordValidator = require('password-validator')
let userPassword = new passwordValidator()
userPassword
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
class User {
  #password

  constructor(name, username, email, password) {
    this.name = name
    this.username = username
    this.email = email
    if (!userPassword.validate(password)) {
      throw new Error('The password does not meet the minimum requirements.')
    }
    this.#password = password
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

  set password(newPassword) {
    if (!userPassword.validate(newPassword)) {
      throw new Error('The password does not meet the minimum requirements.')
    }
    this.#password = newPassword
  }

  get info() {
    return `\n${this.name} is registered with the following data\n- email: ${this.email}\n- Password: ${
      this.#password
    }\n- Username: ${this.username}\n\nAnd posted the following messages:${this.collectionPost
      .map((post, i) => {
        return `\n\n*****  Post number: ${i}  *****\nDate: ${post.date}\nHour: ${post.hour}\nMessage: ${post.message}`
      })
      .join('')}`
  }
}

module.exports = User
