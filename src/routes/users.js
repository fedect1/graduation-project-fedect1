var express = require('express')
var router = express.Router()
const User = require('../models/user')

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   try {
//     res.send(
//       User.list.map(el => {
//         return {
//           email: el.email,
//           following: el.following.map(el => el.email),
//           followedBy: el.followedBy.map(el => el.email),
//         }
//       })
//     )
//   } catch (error) {
//     res.status(404).send(error.message)
//   }
// })

/* POST create a new user. */
router.post('/', function (req, res, next) {
  const user = User.create({ email: req.body.email })
  res.send(user)
})

/* POST a new follow. */

// router.post(
//   '/follow',

//   function (req, res, next) {
//     try {
//       const user = User.list.find(el => el.email === req.body.email)
//       const userToFollow = User.list.find(el => el.email === req.body.userToFollow)
//       const resultFollow = user.follow(userToFollow)
//       res.send(resultFollow)
//       // ({
//       //   email: user.email,
//       //   following: user.following.map(el => el.email),
//       //   followedBy: user.followedBy.map(el => el.email),
//       // })
//     } catch (error) {
//       res.status(404).send(error.message)
//     }
//   }
// )

module.exports = router
