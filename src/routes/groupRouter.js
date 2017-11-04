var express = require('express');
var groupRouter = express.Router();
var models = require('../models/models');

var router = function () {

    groupRouter.get('/:id', function(req, res){
        var groupID = req.params.id;
        var user_groups = req.user.groups;
        if(req.user.groups.indexOf(groupId) == -1){
            res.redirect('/profile/dashboard');
        }else{
            
        }
    });
    
    return groupRouter;
}

module.exports = router;