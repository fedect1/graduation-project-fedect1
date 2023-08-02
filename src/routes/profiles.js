const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* Get user profile by id */
router.get('/:userId', async function (req, res, next) {
  const user = await User.findOne({ email: req.params.userId })
  res.send(user)
})

/* Update user name by id */
router.patch('/:userId/name', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { name: req.body.name }, { new: true })
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'Error creating/updating user name' })
  }
})

module.exports = router
