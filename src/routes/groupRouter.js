/*jshint node: true */
var express = require('express');
var models = require('../models/models');
var dbScripts = require('../config/dbScripts.js');
var groupRouter = express.Router();

function generateGroup(initial_record) {
    var group_initial = [];
    // new_initial has -1 if it's not a month or a list of user_names
    for (var i = 0; i < initial_record.length; i++) {
        group_initial.append([]);
        for (var j = 0; j < initial_record[0].length; i++) {
            var to_append = (initial_record[i][j] == -1) ? -1 : [];
            group_initial[i].append(to_append);
        }
    }
    return group_initial;
}

function generateIntitalNow() {
    var today = new Date
    return dbScripts(today.getDay(), Date.getMonth());
}

var router = function () {

    groupRouter.route('/').get(function(req, res){
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
                // get last element of the array
                return_obj.current_month = result.usersarr.slice(-1)[0];
                res.render('specificGroup', return_obj);
            });
        }
    });

    groupRouter.post('/createGroup', function (req, res) {
        var initial_record = generateIntitalNow();
        var group_initial = generateGroup(initial_record);
        var group = {
            target: req.target,
            name: req.params.groupName,
            users: [req.user.name, req.user._id, 0, initial_record],
            group_calendar: group_initial,
            secret: req.params.secret,
            duration: req.params.duration
        };
        console.log("GOT HERE1!");
        var group_model = new models.Group(group);
        group_model.save(function (err, result) {
            console.log("GOT HERE2!");
            if (err) console.log("CREATE_GROUP", err);
            else {
                var redirect_url = '/' + result._id;
                res.redirect(redirect_url);
            }
        });
    });

//    groupRouter.post('/joinGroup', function (req, res) {
//        var group_id = req.params.groupID;
//        var secret_att = req.params.secret;
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
//                curr_group.users.append(new_user);
//                curr_group.update(function (err, result) {
//                    if (err) console.log("ERROR UPDATING curr_group", err);
//                    else {
//                        models.User.findOne({
//                            _id: req.user._id
//                        }, function (err, curr_user) {
//                            if (err) console.log("JOIN GROUP CAN'T FIND PERSON", err);
//                            else {
//                                curr_user.groups.append(curr_group._id);
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
