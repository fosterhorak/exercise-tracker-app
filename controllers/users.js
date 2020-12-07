const User = require('../models/user');

module.exports = {
    index
    
}

function index (req, res) {
    User.find({}, function(err, user) {
        res.render('my-page/index', { title: `My Page`, user});
    });
}



