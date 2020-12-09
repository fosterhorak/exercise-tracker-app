const Exercise = require('../models/exercise');

module.exports = {
    index,
    show, 
    new: newExercise, 
    create, 
    edit, 
    update
}

function index (req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'All Exercises', exercises});
    });
}

function show (req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        //console.log(exercise);
        res.render('exercises/show', {exercise, title: 'Exercise Details'});
    });
}

function newExercise (req, res) {
    res.render('exercises/new', { title: "Add Exercise"});
}

function create (req, res) {
    const exercise = new Exercise(req.body);
    //set exercise values not shown in the form
        //creatorId
        exercise.creatorId = req.user._id;
        //creatorName
        exercise.creatorName = req.user.name;
        //creatorAvatar
        exercise.creatorAvatar = req.user.avatar;

    //add userID to favoritedBy if check box is checked
    exercise.save(function(err) {
        //handle errors
        if (err) return res.redirect('/exercises/new');
        
        //check to see what the new exercise looks like
        //console.log(exercise);

        //redirect to exercises index list
        res.redirect('/exercises');
    });
}

function edit (req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        //verify exercise is created by user
        if (!exercise.creatorId.equals(req.user._id)) return res.redirect('/exercises');
        res.render('exercises/edit', {exercise, title: "Edit Exercise"});
    });
}

function update(req, res) {
    Exercise.findOneAndUpdate(
        {_id: req.params.id}, 
        req.body,
        {new: true},
        function(err, exercise) {
            if (err || !exercise) return res.redirect('/exercises');
            res.redirect(`/exercises/${req.params.id}`);
        }
    );
}