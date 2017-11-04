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
            models.User.findOne({
                info : {
                    name : username,
                    password : password
                }
            }, function(err, results){
                if (err) done(err);
                else {
                   if(results.info.password == password){
                       console.log("WE SIGNED IN!");
                       var user = results; 
                       done(null, user);
                   }else{
                       done(null, false, {message : 'Bad Password'});
                   }
                }
            });
            var user = {
                username: username,
                password: password
            };
            console.log('strategy user', user);
            done(null, user);
        }));
};
