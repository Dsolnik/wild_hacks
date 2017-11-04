/*jshint node: true */
var passport = require('passport');

var passportFunction = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done){
        console.log("serialize user:", user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        // find Id's and pass user object back in
        console.log("deserialize user:", user);
        done(null, user);
    });
    
    require('./strategies/local.strategy')();
    
};
    
module.exports = passportFunction;