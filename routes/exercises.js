const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');
const isLoggedIn = require('../config/auth');

//route for list of all exercises
// GET /flights 
router.get('/', exercisesCtrl.index);

//route for showing a new exercise entry form
// GET /flights/new
router.get('/new', isLoggedIn, exercisesCtrl.new);

//route for posting a new exercise
// POST /flights
router.post('/', exercisesCtrl.create);




//router.get('/:id', exercisesCtrl.show);
//router.post('/', isLoggedIn, exercisesCtrl.create);

module.exports = router;
