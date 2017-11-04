var express = require('express');
var groupRouter = express.router();

var router = function () {

    groupRouter.get('/:id', function(req, res){
       var groupID = req.params.id; 
    });
    
    return groupRouter;
}

module.exports = router;