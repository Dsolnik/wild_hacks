/*jshint node: true */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../../models/models');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            var desired_user = { 'info.name' : username, 
                                 'info.password' : password };
            console.log("SEARCHING DATABASE FOR ", desired_user);
            models.User.findOne(desired_user, function (err, result) {
                if (err) done(err);
                else {
                    console.log("OUR ITEM we found is", result);
                    if (result && result.info.password == password) {
                        console.log("WE SIGNED IN!");
                        var user = result;
                        done(null, user);
                    } else {
                        done(null , false, {
                            message: 'Bad Password'
                        });
                    }
                }
            });
        }));
};