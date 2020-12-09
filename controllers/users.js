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
    if (!req.body.birthday) {
        alert('must enter birthday');
        res.redirect('/my-page/edit');
    };
    let user = req.user;
    
    //set values from body of form to user 
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.gender = req.body.gender;
    user.birthday = req.body.birthday;
    
    //age calculation:
    let bd_month = user.birthday.getMonth();
    let bd_day = user.birthday.getDate();
    let bd_yr = user.birthday.getFullYear();
    user.age = calculate_age(bd_month, bd_day, bd_yr);
    
    //save and redirect
    user.save();
    res.redirect('/my-page');

}

function calculate_age(birth_month,birth_day,birth_year)
{
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}
