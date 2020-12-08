const User = require('../models/user');

module.exports = {
    profile, 
    edit
    
}

function profile (req, res) {
    let user = req.user;
    res.render('my-page/profile', {user, title: `My Page`});
}

function edit (req, res) {
    let user = req.user;
    res.render('my-page/edit', {user, title: 'My Page'});
}



