const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

/* POST signup */
router.post('/', async function (req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.register({ email }, password)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})

/* POST create a session */
router.post('/session', passport.authenticate('local', { failWithError: true }), async function (req, res, next) {
  res.send(req.user)
})

/* DELETE destroy a session */
router.delete('/session', function (req, res) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
