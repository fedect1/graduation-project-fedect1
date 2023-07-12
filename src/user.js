class User {
  constructor(name, username, email, location, age) {
    this.name = name
    this.username = username
    this.email = email
    this.location = location
    this.age = age
  }
  getInfo() {
    return `${this.name} is in ${this.location}.
    He/She/They registered with the following
    - email: ${this.email}
    - Date of birth: ${this.age}
    - Username: ${this.username}
    `
  }
}

module.exports = User
