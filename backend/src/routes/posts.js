var express = require('express')
var router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
// GETTERS
/* GET Post. */
router.get('/', async function (req, res, next) {
  const numberOfVisits = req.session.numberOfVisits || 0
  console.log(`Number of visits: ${numberOfVisits}`)
  req.session.numberOfVisits = numberOfVisits + 1
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
router.delete('/:postId/comments/:commentIndex', async function (req, res, next) {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }
    await post.deleteComment(req.params.commentIndex)
    // Send the response
    res.send({ message: 'Comment deleted successfully' })
  } catch (error) {
    next(error)
  }
})
router.post('/:postId/likes', async function (req, res, next) {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }
    // Add the like
    await post.addLike(req.body.user)

    // Send the response
    res.send({ message: 'Like added successfully' })
  } catch (error) {
    next(error)
  }
})
router.delete(`/unlike/:postId/:userId`, async function (req, res, next) {
  try {
    // Find the post
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }
    // Remove the like
    await post.deleteLike(req.params.userId)

    // Send the response
    res.send({ message: 'Like removed successfully' })
  } catch (error) {
    next(error)
  }
})
router.delete
module.exports = router
