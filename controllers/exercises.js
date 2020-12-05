const Exercise = require('../models/exercise');

module.exports = {
    index
}

function index (req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'All Exercises', exercises});
    });
}