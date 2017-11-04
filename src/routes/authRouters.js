/*jshint node: true */

var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var models = require('../models/models');
var router = function () {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log('signup here', req.body);
            // insert the user into the database HERE
            var user = new models.User({
                name: req.body.name,
                email: req.body.email
            });
            user.save();
            // replace req.body with the object of the user
            req.login(user, function () {
                res.redirect('/auth/dashboard');
            });
            // put in checking the user here
            res.end();
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            console.log("Sucessful Sign in!");
            res.redirect('/auth/dashboard');
        });

    authRouter.route('/dashboard')
        .get(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        });

    authRouter.route('/dashboard')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;
