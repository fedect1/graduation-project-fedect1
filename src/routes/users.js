var express = require('express')
var router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find()
  res.send(users)
})

/* POST create a new user. */
router.post('/', async function (req, res, next) {
  const user = await User.create({ email: req.body.email })
  res.send(user)
})

/* POST a new follow. */

router.post('/:userId/follow', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
    const userToFollow = await User.findById(req.body.user)
    const resultFollow = await user.follow(userToFollow)
    res.send(resultFollow)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router
