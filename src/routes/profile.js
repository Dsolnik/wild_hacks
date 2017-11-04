/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var status = require('http-status');
var bodyparser = require('body-parser');

var profileRouter = express.Router();
profileRouter.use(bodyparser.json());

profileRouter.get('/dashboard', function(req, res){
    // change to 'dashboard'
    return res.render('login')
});

module.exports = profileRouter