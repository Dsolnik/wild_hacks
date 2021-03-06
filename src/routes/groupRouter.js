/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var dbScripts = require('../config/dbScripts.js');
var groupRouter = express.Router();

function generateGroup(initial_record) {
    var group_initial = [];
    // new_initial has -1 if it's not a month or a list of user_names
    for (var i = 0; i < initial_record.length; i++) {
        group_initial.push([]);
        for (var j = 0; j < initial_record[0].length; i++) {
            var to_append = (initial_record[i][j] == -1) ? -1 : [];
            group_initial[i].push(to_append);
        }
    }
    return group_initial;
}

function generateIntitalNow() {
    var today = new Date();
    return generate2D(dbScripts.genCal(today.getDay(), today.getMonth()));
}

function generate2D(arr){
    var new_arr = [];
    for(var i = 0; i < 5; i++){
        new_arr.push([]);
        for(var j = 0; j < 7; j++){
            var value = arr[i][j] ? arr[i][j] : -1;
                new_arr[i].push(value);
        }
    }
}

var router = function () {

    groupRouter.route('/').get(function (req, res) {
        res.render('groups');
    });

    groupRouter.get('/:id', function (req, res) {
        console.log("GOT ID");
        var group_ID = req.params.id;
        console.log(req.user);
        //        var user_groups = req.user.groups;
        if (req.user.groups.indexOf(group_ID) == -1) {
            res.redirect('/profile/dashboard');
        } else {
            models.Group.findOne({
                _id: group_ID
            }, function (err, result) {
                var return_obj = {};
                return_obj.users = result.users;
                console.log("RESULT USRS", result.users);
                // get last element of the array
                return_obj.current_month = result.users.slice(-1)[0];
                res.render('specificGroup', return_obj);
            });
        }
    });

    groupRouter.post('/createGroup', function (req, res) {
        //        console.log("user is", req.user);
        var initial_record = generateIntitalNow();
        var group_initial = generateGroup(initial_record);
        var start_user = {
            name: req.user.info.name,
            id: req.user._id,
            score: 0,
            record: initial_record
        };

        var group = {
            target: req.body.target,
            name: req.body.groupName,
            users: [start_user],
            group_calendar: group_initial,
            secret: req.body.secret,
            duration: req.body.duration
        };
        //        console.log("GOT HERE1!");
        console.log("The elemnt is", group);
        var group_model = new models.Group(group);
        group_model.save(function (err, curr_group) {
            //            console.log("GOT HERE2!");
            if (err) console.log("CREATE_GROUP", err);
            else {
                models.User.findOne({
                    _id: req.user._id
                }, function (err, curr_user) {
                    if (err) console.log("JOIN GROUP CAN'T FIND PERSON", err);
                    else {
                        console.log("******OUR OBJECT IS", curr_user);
                        console.log("******OUR GROUP IS", curr_group);
                        var a = Array.from(curr_user.groups);
                        console.log("BEFORE", a);
                        a.push(curr_group._id);
                        console.log("AFER", a);
                        curr_user.groups = a;
                        curr_user.save(function (err, res) {
                            console.log("THE ERROR IS", err);
                        });
                        res.redirect('/profile/group/' + curr_group._id);
                    }
                });
            }
        });
    });

    //    groupRouter.post('/joinGroup', function (req, res) {
    //        var group_id = req.body.groupID;
    //        var secret_att = req.body.secret;
    //        models.Group.findOne({
    //            _id: group_id,
    //            secret: secret_att
    //        }, function (err, curr_group) {
    //            if (err) console.log("JOIN GROUP OUTER", err);
    //            if (curr_group) {
    //                var initial_now = generateIntitalNow();
    //                var new_user = {
    //                    name: req.user.name,
    //                    _id: req.user._id,
    //                    score: 0,
    //                    record: initial_now
    //                };
    //                curr_group.users.push(new_user);
    //                curr_group.update(function (err, result) {
    //                    if (err) console.log("ERROR UPDATING curr_group", err);
    //                    else {
    //                        models.User.findOne({
    //                            _id: req.user._id
    //                        }, function (err, curr_user) {
    //                            if (err) console.log("JOIN GROUP CAN'T FIND PERSON", err);
    //                            else {
    //                                curr_user.groups.push(curr_group._id);
    //                                curr_user.update(function (err, result) {
    //                                    if (err) console.log("ERROR updating curr_user", err);
    //                                });
    //                            }
    //                        });
    //                    }
    //                });
    //            } else {
    //                res.redirect('/');
    //            }
    //        });
    //    });

    return groupRouter;
};

module.exports = router;
