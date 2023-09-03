var express = require('express')
var router = express.Router()
const User = require('../models/user')

//User Routes
/* Get all users. */
router.get('/', async function (req, res, next) {
  const users = await User.find()
  res.send(users)
})

/* Get user by id. */
router.get('/:userId', async function (req, res, next) {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

// /* // Create a new user */
// router.post('/', async function (req, res, next) {
//   const user = await User.create({ email: req.body.email })
//   res.status(201).send(user._id)
// })

/* POST signup */
router.post('/', async function (req, res, next) {
  try {
    console.log("create user")
    const {name ,email, password } = req.body
    const user = await User.register({ name, email }, password)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})

/* POST a new follow to a user */

router.put('/profile/:userId/follow', async function (req, res, next) {

  try {

    const user = await User.findById(req.params.userId)
    const ToFollow = await User.findById(req.body.userToFollow)
    const resultFollow = await user.follow(ToFollow)
    res.status(201).send(resultFollow)
  } catch (error) {
    res.status(404).send(error.message)
  }
})


/* DELETE a follow. */
router.delete('/profile/:userId/unfollowing/:unfollowId', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    console.log('userToUnfollow', req.params.unfollowId)
    const toUnfollow = await User.findById(req.params.unfollowId)
    if (!toUnfollow) {
      return res.status(404).send({ message: 'User to unfollow not found' })
    }
    await user.unfollow(toUnfollow)
    res.sendStatus(204)
  } catch (error) {
    res.status(404).send(error.message)
  }
})


/* GET followers of a user. */
router.get('/profile/:userId/followers', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const followers = await user.following
    res.status(200).send({ followers })
  } catch (error) {
    res.status(404).send(error.message)
  }
})

/* GET followings of a user. */
router.get('/profile/:userId/followings', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const followings = user.following
    res.status(200).send({ followings })
  } catch (error) {
    res.status(404).send(error.message)
  }
})

//Profile Routes
/* Get profile by id. */
router.get('/profile/:userId', async function (req, res, next) {
  const user = await User.findById(req.params.userId)
  const profile = {
    name: user.name,
    description: user.description,
    avatar: user.avatar,
  }
  res.status(200).send(profile)
}),
  /* Update name of a user */
  router.put('/profile/:userId/name', async function (req, res, next) {
    try {
      const user = await User.findById(req.params.userId)
      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }
      user.name = req.body.name
      await user.save()
      res.status(204).send(user)
    } catch (error) {
      res.status(404).send(error.message)
    }
  })

/* Update description of a user */
router.put('/profile/:userId/description', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    user.description = req.body.description
    await user.save()
    res.status(204).send(user)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

/* Update avatar of a user */
router.put('/profile/:userId/avatar', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    user.avatar = req.body.avatar
    await user.save()
    res.status(204).send(user)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
