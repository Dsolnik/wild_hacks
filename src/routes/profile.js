/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');

var profileRouter = express.Router();
var groupRouter = require('groupRouter');

profileRouter.use('/group', groupRouter);

profileRouter.use(function(req, res, next{
                            if(!req.user) res.redirect('/login');
                            
                            
                            }));

profileRouter.get('/dashboard', function(req, res){
    // change to 'dashboard'
    return res.render('dashboard');
});

module.exports = profileRouter;