/*jshint node: true */
var express = require('express');
var groupRouter = express.Router();
var models = require('../models/models');

var router = function () {

    groupRouter.get('/:id', function(req, res){
        var group_ID = req.params.id;
        var user_groups = req.user.groups;
        if(req.user.groups.indexOf(group_ID) == -1){
            res.redirect('/profile/dashboard');
        }else{
            models.Group.findOne({_id : group_ID}, function(err, result){
                var return_obj = {};
                return_obj.users = result.users;
                // get last element of the array
                return_obj.current_month = result.usersarr.slice(-1)[0];
                res.render('specificGroup', return_obj);                
            });
        }
    });
    
    groupRouter.post('/createGroup', function(req, res){
        var initial_record = leron_function();
        var group_initial = [];
        // new_initial has -1 if it's not a month or a list of user_names
        for(var i = 0; i < initial_record.length; i++){
            new_initial.append([]);
            for(var j = 0; j <initial_record[0].length; i++){
                var to_append = (initial_record[i][j] == -1) ? -1 : []
                new_inital[i].append(to_append);
            }
        }
        var group = {
            name: req.params.groupName,
            users : [req.user.name, req.user._id, 0, initial_record, req.target]
            group_calendar : group_initial
    });
    
    groupRouter.post('/joinGroup', function(req, res){
       
    });
    
    return groupRouter;
};

module.exports = router;