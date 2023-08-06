const Post = require('./models/post')

class Middleware {
  async expirationCheck(req, res, next) {
    try {
      const currentTime = new Date()
      const validPosts = await Post.find({ expirationDate: { $lte: currentTime }, status: true })
      await Promise.all(
        validPosts.map(async post => {
          post.status = false
          await post.save()
        })
      )
      next()
    } catch (error) {
      return res.status(500).json({ error: 'Server error' })
    }
  }
}
module.exports = Middleware
