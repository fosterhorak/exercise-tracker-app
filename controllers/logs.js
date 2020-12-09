const exercise = require('../models/exercise');
const Exercise = require('../models/exercise');

module.exports = { 
    create, 
    delete: deleteLog 
    //edit, 
    //update,
}

function create (req, res) {
    //find correct exercise...
    Exercise.findById(req.params.id, function(err, exercise) {
        //assign all properties not specified in form
        req.body.exerciseName = exercise.name;
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        req.body.workVol = req.body.weightUsed * req.body.reps * req.body.sets;
        if (req.body.restTime) {
            let totalWorkingTime = ((req.body.sets - 1)*req.body.restTime)
            req.body.workEff = (req.body.workVol / totalWorkingTime).toFixed(1);
        } 
        if (!req.body.restTime) {
            req.body.workEff = null;
        }
        
        //push the subdoc for the log
        exercise.logs.push(req.body);

        //save the exercise
        exercise.save(function(err) {
            if (err) console.log(err);
            res.redirect(`/exercises/${exercise._id}`);
        });
    });
}

function deleteLog (req, res) {
    Exercise.findOne(
        {'logs._id': req.params.id, 'logs.userId': req.user._id}, 
        function(err, exercise) {
            if (!exercise || err) return res.redirect(`/exercises/${exercise._id}`);
            
            console.log('***console log: req.params.id')
            console.log(req.params.id);
            console.log('***console log: req.user._id')
            console.log(req.user._id);
            console.log('***console log: exercise')
            console.log(exercise);
            
            // remove log subdoc
            exercise.logs.remove(req.params.id);
            console.log('***console log after "remove": exercise')
            console.log(exercise);

            //save updated exercise
            exercise.save(function(err) {
                if (err) console.log(err);
                
                //redirect to exercise show view
                res.redirect(`/exercises/${exercise._id}`);
            });
        }); 
}

