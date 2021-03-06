/*jshint node: true */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

// routers
var authRouter = require('./src/routes/authRouters')();
var profileRouter = require('./src/routes/profileRouter')();
var port = process.env.PORT || 5000;

// parse body into app.body 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    type: 'application/*+json'
}));

// cookie parser and session middleware setup
app.use(cookieParser());
app.use(session({
    secret: 'workout',
    resave: false,
    saveUninitialized: false
}));

// set up passport and do passport stuff
require('./src/config/passport')(app);

// views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// default directory
app.use(express.static('public'));

// set routers
app.use('/Auth', authRouter);
app.use('/profile', profileRouter);

app.use(function(req, res, next){
    if(!req.user) res.redirect('/auth/login');
    else{
        next();
    }
})

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
