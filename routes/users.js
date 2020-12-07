var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const isLoggedIn = require('../config/auth');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// go to user's profile page
router.get('/', isLoggedIn, usersCtrl.profile);

module.exports = router;
