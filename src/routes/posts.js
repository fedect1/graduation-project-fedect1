var express = require('express')
var router = express.Router()
const Post = require('../post')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Post.list)
})

/* POST create a new post. */
router.post('/:email', function (req, res, next) {
  const user = User.list.find(user => user.email === req.params.email)
  const post = user.createPost({ message: req.body.message })
  res.send(post)
})

module.exports = router
