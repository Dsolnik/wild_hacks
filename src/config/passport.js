/*jshint node: true */
var passport = require('passport');
var models = require('../models/models');

var passportFunction = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
//        console.log("SERIALIZING USER:", user);
        done(null, user._id);
    });

    passport.deserializeUser(function (userID, done) {
        // find Id's and pass user object back in
        models.User.findOne({_id : userID}, function(err, result){
            if (err) done(err);
            done(null, result);            
        })
    });
    
    require('./strategies/local.strategy')();

};

module.exports = passportFunction;
