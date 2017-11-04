/*jshint node: true */


var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var models = require('../models/models');
var router = function () {

    authRouter.route('/signUp')
        .post(function (req, res) {
            // insert the user into the database HERE
            var user = {
                info: {
                    name: req.body.userName,
                    email: req.body.email
                }
            };

            console.log('SIGNING UP -----', user);

            var user_model = new models.User(user);

            user_model.save(function (err, result) {
                if (err) console.log(err);
                else {
                    console.log("Saved User!");
                    // replace req.body with the object of the user
                    req.login(user_model, function () {
                        res.redirect('/auth/dashboard');
                    });
                    // put in checking the user here
                    res.end();
                }
            });

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
