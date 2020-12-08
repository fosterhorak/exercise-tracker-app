const user = require('../models/user');
const User = require('../models/user');

module.exports = {
    profile, 
    edit, 
    update
    
}

function profile (req, res) {
    let user = req.user;
    res.render('my-page/profile', {user, title: `My Page`});
}

function edit (req, res) {
    let user = req.user;
    res.render('my-page/edit', {user, title: 'My Page'});
}

function update(req, res) {
    let user = req.user;
    user.birthday = req.body.birthday;
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.gender = req.body.gender;
    user.save();
    res.redirect('/my-page');

    // User.findOneAndUpdate(
    //     {_id: req.user.id}, 
    //     req.body, 
    //     {new: true},
    //     function(err, user) {
    //         if (err || !user) return res.redirect('/');
    //         res.redirect('/my-page');
    //     });
}


// function update(req, res) {
//     Exercise.findOneAndUpdate(
//         {_id: req.params.id}, 
//         req.body,
//         {new: true},
//         function(err, exercise) {
//             if (err || !exercise) return res.redirect('/exercises');
//             res.redirect(`/exercises/${req.params.id}`);
//         }
    
//     );

    // const exercise = Exercise.update(req.params.id, req.body);
    // exercise.save(function(err) {
    //     //handle errors
    //     if (err) return res.redirect('/exercises/edit');
    //     //see what updated exercise looks like
    //     console.log(exercise);
    //     //redirect to exercise show page
    //     res.redirect('/exercises');
    
// }