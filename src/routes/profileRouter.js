/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');

var profileRouter = express.Router();
var groupRouter = require('./groupRouter');

module.exports = function () {
    
    profileRouter.use('/group', groupRouter);

    profileRouter.get('/dashboard', function(req, res){
        res.render('dashboard');
    });
    /*
    profileRouter.get('/settings', function(req, res){
        res.render('settings');
    })
    */
    return profileRouter
};