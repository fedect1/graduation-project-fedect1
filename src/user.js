const Post = require('./post')
const Profile = require('./profile')

class User {
  posts = []
  interaction = { following: [], followedBy: [] }

  constructor(email) {
    this.email = email
    this.profile = new Profile(email)
  }

  // Profile setters
  set profileUsername(userName) {
    return (this.profile.userName = userName)
  }
  set profileDescription(description) {
    return (this.profile.description = description)
  }
  set profilePictureURL(profilePictureURL) {
    return (this.profile.profilePictureURL = profilePictureURL)
  }

  //Post functionalities
  addPost(message) {
    const newPost = new Post(message)
    this.posts.push(newPost)
  }
  deletePost(indexPost) {
    if (indexPost >= 0 && indexPost <= this.posts.length) {
      this.posts.splice(indexPost, 1)
    } else {
      throw new Error('The index you entered does not correspond to the length of the array.')
    }
  }

  //Iteraction functionalities
  follow(userToFollow) {
    //Rename userToFollow ->user
    if (userToFollow) {
      this.interaction.following.push(userToFollow.profile.userName)
      userToFollow.interaction.followedBy.push(this.profile.userName)
    }
  }

  unfollow(userToUnfollow) {
    //Rename userToFollow ->user
    if (userToUnfollow) {
      const indexOfUser = this.interaction.following.indexOf(userToUnfollow.profile.userName)
      this.interaction.following.splice(indexOfUser, 1)
      const indexOfUserUnfollowed = userToUnfollow.interaction.followedBy.indexOf(userToUnfollow.userName)
      userToUnfollow.interaction.followedBy.splice(indexOfUserUnfollowed, 1)
    }
  }
  // Date formating
  datePostFormat(datePost) {
    const calcDaysPassed = datePost => {
      const currentDate = new Date()
      const daysPassed = Math.round(Math.abs(currentDate - datePost) / (1000 * 60 * 60 * 24))
      return daysPassed
    }
    const daysPassed = calcDaysPassed(datePost)

    if (daysPassed === 0) return 'Today'
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed < 7) return `${daysPassed} days ago`
    if (daysPassed) return `${Math.floor(daysPassed / 7)} weeks ago`
  }

  dateExpirationFormat(dateExpPost) {
    const calcTime = dateExpPost => {
      const currentDate = new Date()
      const timeDifferenceInSeconds = Math.abs(dateExpPost - currentDate) / 1000

      const hours = Math.floor(timeDifferenceInSeconds / 3600)
      const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)
      const seconds = Math.floor(timeDifferenceInSeconds % 60)

      return `Time left: ${hours}:${minutes}:${seconds}`
    }

    const expirationTime = calcTime(dateExpPost)
    return expirationTime
  }

  // Show info getters
  get profileInfo() {
    return `\n --- PROFILE INFO ---\n Username: ${this.profile.userName}\n Email: ${this.email}\n Description: ${this.profile.description}\n Profile picture URL: ${this.profile.profilePictureURL}`
  }
  get interactionInfo() {
    const followedByString =
      this.interaction.followedBy.length === 0
        ? 'There are no followers'
        : this.interaction.followedBy.map((el, i) => `${i + 1}- ${el}`).join('\n') //rename //Wrap into a function
    const followingString =
      this.interaction.following.length === 0
        ? 'Does not follow anyone'
        : this.interaction.following.map((el, i) => `${i + 1}- ${el}`).join('\n')
    return `\n --- INTERACTION ---\n Followed by:\n${followedByString}\n Following:\n${followingString}`
  }
  get postsInfo() {
    const postByString =
      this.posts === 0
        ? 'Has not published post'
        : this.posts
            .map(
              (
                el,
                i //rename
              ) =>
                `Posted: ${this.datePostFormat(el.date)}\n
                Status: ${el.status ? 'Visible' : 'Expired'}\n
                ${el.status ? this.dateExpirationFormat(el.expirationDate) : ''}\n
                Post: ${el.message}\n
                ${el.allComments}\n
                ${el.allLikes}`
            )
            .join('\n')
    return `--- POSTS ---\n ${postByString}`
  }
  static create({ email }) {
    console.log('Creating user with email: ', email)
    const newUser = new User(email)
    User.list.push(newUser)
    return newUser
  }

  static list = []
}

module.exports = User
