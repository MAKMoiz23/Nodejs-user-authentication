const express = require('express');
const mongoose = require('mongoose');
const login = require('./routes/login.js');
const register = require('./routes/register');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session')
const passport = require("passport")


const CONNECTION_URL = 'mongodb+srv://<user>:<password>@cluster0.x6tpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.port || 5000;

// app
const app = express()
require("./config/passport.js")(passport);
// EJS
app.use(expressLayout)
app.set('view engine', 'ejs')

// static
app.use(express.static(__dirname +'/public'))

app.use('/css', express.static( __dirname + 'public/css'))
app.use('/vendor/jquery', express.static( __dirname + 'public/vendor/jquery'))
app.use('/js', express.static( __dirname + 'public/js'))
app.use('/images', express.static( __dirname + 'public/images'))

// json body-parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/login', login)
app.use('/register', register)
app.get('/dashboard', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })(req, res, next);
})

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(app.listen(PORT, ()=> console.log(`The server is running on port ${PORT}...`)))
    .catch((err) => console.log(err.message));
