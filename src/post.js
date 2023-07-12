class Post {
  constructor() {
    this.posts = []
  }
  addPost(username, date, hour, textPost) {
    this.posts.push({ username, date, hour, textPost })
  }
  getPosts() {
    return this.posts
      .map((post, i) => {
        return `\nUsername: ${post.username}\nIndex: ${i + 1}\nDate: ${post.date}\nHour: ${post.hour}\nPost: ${
          post.textPost
        }\n\n`
      })
      .join('')
  }
}

module.exports = Post
