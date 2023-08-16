const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/session', async function (req, res, next) {
  res.send(req.session)
})

/* POST signup */
router.post('/signup', async function (req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.register({ email }, password)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
