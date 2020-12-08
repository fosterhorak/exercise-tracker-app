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
        console.log('printing exercise when found by id: ');
        console.log(exercise);
        console.log('printing req.body before assignments...: ');
        console.log(req.body);
        
        //assign all properties not specified in form
        req.body.exerciseName = exercise.name;
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log('printing req.body after assignments...: ');
        console.log(req.body);
        
        //push the subdoc for the log
        exercise.logs.push(req.body);
        console.log('printing exercise after push of req.body: ');
        console.log(exercise);
        console.log('printing exercise.logs after push of req.body: ');
        console.log(exercise.logs);
        //save the exercise
        exercise.save(function(err) {
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

