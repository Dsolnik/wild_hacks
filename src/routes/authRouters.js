/*jshint node: true */

var express = require('express');
var authRouter = express.Router();
var passport = require('passport');


var router = function (wagner) {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log('signup here', req.body);
            // insert the user into the database HERE
            var user = new wagner.User();
            user.name = req.body.name;
            user.email = req.body.email;
            // replace req.body with the object of the user
            req.login(req.body, function () {
                res.redirect('/auth/dashboard');
            });
            // put in checking the user here
            res.end();
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            console.log("WE GOOD!");
            res.redirect('/auth/dashboard');
        });

    authRouter.route('/dashboard')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;
