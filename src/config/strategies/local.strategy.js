/*jshint node: true */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField : 'userName',
        passwordField : 'password'
    },
    function(username, password, done) {
        var user = {
            username : username,
            password : password
        };
        console.log('strategy user', user);
        done(null, user);
    }));
};