var express = require('express')
var router = express.Router()
const User = require('../user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

/* POST create a new user. */
router.post('/', function (req, res, next) {
  const user = User.createUser({ email: req.body.email })
  res.send(user)
})

module.exports = router
