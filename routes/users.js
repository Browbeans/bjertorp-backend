var express = require('express');
var router = express.Router();
const User = require('../server/users/user.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  const result = User.find()
  res.send(result)
});

module.exports = router;
