/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');
var dbScripts = require('../config/dbScripts');

var profileRouter = express.Router();
//var groupRouter = require('./groupRouter');

module.exports = function () {
    
    //profileRouter.use('/group', groupRouter);

    profileRouter.get('/dashboard', function(req, res){
        var now = new Date;
        var record = req.user.record;
        // add new month to record if month has changed
        if (now.getMonth()!=req.user.current_date.getMonth()) {
            req.user.update(
                {record: req.user.record.push(dbScripts.genCal(1, now.getMonth()))},
                {current_date: now}
            );
        }
        res.render('dashboard');
    });

    //route for updating current day activity

    /*
    profileRouter.get('/settings', function(req, res){
        res.render('settings');
    })
    */
    return profileRouter
};