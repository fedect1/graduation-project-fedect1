const Post = require('./post')
const Profile = require('./profile')

class User {
  posts = []
  interaction = { following: [], followed: [] }
  constructor(email) {
    this.email = email
    this.profile = new Profile(email)
  }

  post(message) {
    const newPost = new Post(message)
    this.posts.push(newPost)
  }

  deletePost(indexPost) {
    if (indexPost >= 0 && indexPost < this.posts.length) {
      this.posts.splice(indexPost, 1)
    } else {
      throw new Error('The index you entered does not correspond to the length of the array.')
    }
  }

  get info() {
    return this.profile
  }
}

module.exports = User
