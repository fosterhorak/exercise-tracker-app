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
        // console.log('*** printing exercise after push of req.body: ');
        // console.log(exercise);
        //save the exercise
        exercise.save(function(err) {
            if (err) console.log(err);
            res.redirect(`/exercises/${exercise._id}`);
        });
    });
}

function deleteLog (req, res, next) {
    Exercise.findOne({'logs._id': req.params.id})
        .then(function(exercise) {
            //find review subdoc using id method
            const log = exercise.logs.id(req.params.id);
            // verify log was created by the logged in user
            if (!log.userId.equals(req.user._id)) return res.redirect(`/exercises/${exercise._id}`);
            log.remove();
            exercise.save().then(function() {
                res.redirect(`/exercises/${exercise._id}`);
            }).catch(function(err) {
                //let express display an error
                return next(err);
            });
        });
    
}

