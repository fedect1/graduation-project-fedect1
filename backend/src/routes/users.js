var express = require('express')
var router = express.Router()
const User = require('../models/user')

//User Routes
/* Get all users. */
router.get('/', async function (req, res, next) {
  const users = await User.find()
  res.send(users.map(user => user))
})

/* Get user by id. */
router.get('/:userId', async function (req, res, next) {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

/* // Create a new user */
router.post('/', async function (req, res, next) {
  const user = await User.create({ email: req.body.email })
  res.status(201).send(user._id)
})

/* POST a new follow to a user */

router.post('/:userId/following', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    const userToFollow = await User.findById(req.body.user)
    const resultFollow = await user.follow(userToFollow)
    res.send(resultFollow)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

/* DELETE a follow. */
router.delete('/:userId/unfollowing/:userIdUnfollow', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const userToUnfollow = await User.findById(req.params.userIdUnfollow)
    if (!userToUnfollow) {
      return res.status(404).send({ message: 'User to unfollow not found' })
    }
    await user.unfollow(userToUnfollow)
    res.send({ message: 'Unfollow user successfully' })
  } catch (error) {
    res.status(404).send(error.message)
  }
})

//Profile Routes

/* Update user name by id */
router.patch('/:userId/name', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { name: req.body.name }, { new: true })
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'Error creating/updating user name' })
  }
})

/* Update user description by id */
router.patch('/:userId/description', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { description: req.body.description }, { new: true })
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'Error creating/updating user description' })
  }
})

/* Update user avatar by id */
router.patch('/:userId/avatar', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { avatar: req.body.avatar }, { new: true })
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'Error creating/updating user avatar' })
  }
})
module.exports = router
