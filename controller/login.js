const passport = require('passport')
const getLogin = (req ,res)=>{
    res.status(200).render('login');
}
const postLogin = (req ,res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })(req, res, next);
}

module.exports = {getLogin, postLogin}