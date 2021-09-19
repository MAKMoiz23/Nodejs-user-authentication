const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getRegister = (req ,res)=>{
    res.status(200).render('register');
}
const postRegister = (req ,res)=>{
    const {name, email, password, re_pass, agree_term} = req.body;
    if (password !== re_pass) {
        res.json({sucess: false, msg: "Passwords does'nt match please consider re-submittion..."})
    }
    // Validation
    User.findOne({email: email})
        .then((user)=>{
            // user exist
            if (user) {
                res.json({sucess: false, msg : 'Email is already taken!'})
            }
            else{
                // if user does'nt exist
                const newUser = new User({
                    name,
                    email,
                    password
                })
                // Hash password
                bcrypt.genSalt(
                    10, (err, salt) => {
                        if(err){
                            res.json({sucess : false, msg : err.message})
                        }
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if(err) throw err;
                            // Set password
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/login')
                                })
                                .catch(err => console.log(err.message))

                        })
                    }
                )
            }
        })
}

module.exports = {getRegister, postRegister}