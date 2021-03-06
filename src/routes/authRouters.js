/*jshint node: true */

var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var models = require('../models/models');
var dbScripts = require('../config/dbScripts');

var router = function () {

    authRouter.route('/logIn')
        .get(function (req, res) {
            res.render('login');
        });

    authRouter.route('/signUp')
        .post(function (req, res) {
            // insert the user into the database HERE
            var now = new Date;
            var user = {
                info: {
                    name: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                },
                start_date: now,
                current_date: now,
                record : dbScripts.genCal(now.getDate(),now.getMonth())  
            };

//            console.log('SIGNING UP -----', user);

            var user_model = new models.User(user);

            user_model.save(function (err, result) {
                if (err) console.log(err);
                else {
                    console.log("Saved User!");
                    // replace req.body with the object of the user
                    req.login(user_model, function () {
                        res.redirect('/profile/dashboard');
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
//            console.log("Sucessful Sign in!");
            res.redirect('/auth/dashboard');
        });

    authRouter.route('/dashboard')
        .all(function (req, res, next) {
            console.log("AUTH STEP:", req.user);
            console.log("GOT HERE!");
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.render('login');
        });

    return authRouter;
};

module.exports = router;
