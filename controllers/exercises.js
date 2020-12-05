const Exercise = require('../models/exercise');

module.exports = {
    index, 
    new: newExercise, 
    create
}

function index (req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'All Exercises', exercises});
    });
}

function newExercise (req, res) {
    res.render('exercises/new', { title: "Add Exercise"});
}

function create (req, res) {
    const exercise = new Exercise(req.body);
    //set exercise values not shown in the form
        //creatorId
        //creatorName
    //add userID to favoritedBy if check box is checked
    exercise.save(function(err) {
        //handle errors
        //if (err) return res.redirect('/exercises/new');
        
        //check to see what the new exercise looks like
        console.log(exercise);

        //redirect to exercises index list
        res.redirect('/exercises');

        //trying something else...
        // Exercise.find({}, function(err, exercises) {
        //     res.render('exercises/index', { title: 'All Exercises', exercises});
        // });
    });
}