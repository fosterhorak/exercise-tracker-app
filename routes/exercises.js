const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../controllers/exercises');
const isLoggedIn = require('../config/auth');

//route for list of all exercises
// GET /exercises 
router.get('/', exercisesCtrl.index);

//route for showing a new exercise entry form
// GET /exercises/new
router.get('/new', isLoggedIn, exercisesCtrl.new);

//route for posting a new exercise
// POST /exercises
router.post('/', exercisesCtrl.create);

// PUT /exercises/:id
router.put('/:id', exercisesCtrl.update);

//route for editing and existing  exercise
// GET /exercises/:id/edit
router.get('/:id/edit', isLoggedIn, exercisesCtrl.edit);

//route for seeing a detailed view of an individual exercise
// GET /exercises/:id
router.get('/:id', exercisesCtrl.show);




//router.post('/', isLoggedIn, exercisesCtrl.create);

module.exports = router;
