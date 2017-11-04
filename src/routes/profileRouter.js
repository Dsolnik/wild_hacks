/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');

var profileRouter = express.Router();
var groupRouter = require('groupRouter');

profileRouter.use('/group', groupRouter);

profileRouter.get('/dashboard', function(req, res){
    // change to 'dashboard'
    return res.render('login');
});

module.exports = profileRouter;