class Profile {
  description
  profilePictureURL
  constructor(userName) {
    this.userName = userName
  }

  // Setters
  set description(description) {
    return (this.description = description)
  }

  set pictureURL(profilePictureURL) {
    return (this.profilePictureURL = profilePictureURL)
  }
}

module.exports = Profile
