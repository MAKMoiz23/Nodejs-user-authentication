LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user")

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        function (email, password, done) {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "The email is not registered!" })
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password is incorrect!' })
                        }
                    })
                })
                .catch()
        }
    ));
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done)=> {
        User.findById(id, (err, user)=> {
            done(err, user);
        });
    });
}