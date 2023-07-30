var express = require('express')
var router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

/* GET Comments of a post. */
router.get('/', function (req, res, next) {
  res.send(Comment.list)
})

/* POST a new comment for a post of a user */
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.email === req.body.email)
  const post = Post.list[req.body.indexPost]
  const comment = post.createComment(req.body.author, req.body.comment)
  res.send(comment)
})
module.exports = router
