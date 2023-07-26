var express = require('express')
var router = express.Router()
const Post = require('../post')
const User = require('../user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Post.list)
})

/* POST create a new post. */
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.email === req.body.email)
  const post = user.createPost(req.body.message)
  res.send(post)
})

module.exports = router
