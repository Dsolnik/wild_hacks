/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');

var profileRouter = express.Router();
//var groupRouter = require('./groupRouter');

function monthLen (abbrev) {
    var thirty = ["apr","jun","sept","nov"];
    if (abbrev=="feb") return 28;
    else if (thirty.indexOf(abbrev)>=0) return 30;
    else return 31
};

function genCal(start, thisMonth) {
    var monthCal = new Array
    for (var i = 0; i < monthLen(thisMonth); i++ ){
        if (i < start) monthCal[i] = -1;
        else monthCal[i] = 0;
    }
    return monthCal;
};

module.exports = function () {
    
    //profileRouter.use('/group', groupRouter);

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