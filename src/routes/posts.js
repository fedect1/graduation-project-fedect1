var express = require('express')
var router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
// GETTERS
/* GET Post. */
router.get('/', async function (req, res, next) {
  const posts = await Post.find()
  res.send(posts)
})

/* GET Comments of a post. */
router.get('/:postId/comments', function (req, res, next) {
  res.send(Comment.list)
})

//POSTS
/* POST create a new post. */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const post = await user.createPost(req.body.bodyPost)
  res.send(post)
})

/* POST a new comment for a post of a user */
router.post('/:postId/comments', async function (req, res, next) {
  const post = await Post.findById(req.params.postId)
  const comment = await post.createComment(req.body.user, req.body.text)
  res.send(comment)
})

//DELETE
/* Delete a post */
router.delete('/:userId/:postId', async function (req, res, next) {
  try {
    // Find the user
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    // Find the post index in the user's posts array
    await user.deletePost(req.params.postId)

    // Delete the post from the posts collection
    const deletedPost = await Post.findByIdAndDelete(req.params.postId)
    if (!deletedPost) {
      return res.status(404).send({ message: 'Post not found in collection' })
    }

    // Send the response
    res.send({ message: 'Post deleted successfully' })
  } catch (error) {
    next(error)
  }
})
/* Delete a comment */
router.delete('/:postId/comments/:commentId', async function (req, res, next) {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }
    console.log(post.comments)
    post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.commentId)
    await post.save()
    // Send the response
    res.send({ message: 'Comment deleted successfully' })
  } catch (error) {
    next(error)
  }
})
module.exports = router
