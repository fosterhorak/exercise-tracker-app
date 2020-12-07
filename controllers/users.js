const User = require('../models/user');

module.exports = {
    profile
    
}

function profile (req, res) {
    let user = req.user;
    res.render('my-page/profile', {user, title: `My Page`});
}



