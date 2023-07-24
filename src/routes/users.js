var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ name: 'Raul2' }, { name: 'Jorge2' }])
})

module.exports = router
