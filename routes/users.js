var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');
const isLoggedIn = require('../config/auth');


// go to user's profile page
router.get('/', isLoggedIn, usersCtrl.profile);

// go to edit user's profile page
router.get('/edit', isLoggedIn, usersCtrl.edit);

// PUT /exercises/:id
router.put('/', isLoggedIn, usersCtrl.update);

module.exports = router;
