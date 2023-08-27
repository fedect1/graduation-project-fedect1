const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

/* POST create a session */
router.post('/session', passport.authenticate('local', { failWithError: true }), async function (req, res, next) {
  req.session.userId = req.user.id
  res.send(req.user)
})

/* DELETE destroy a session */
router.delete('/session', function (req, res) {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
