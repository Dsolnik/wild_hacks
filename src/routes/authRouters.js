/*jshint node: true */

var express = require('express');
var authRouter = express.Router();

var router = function() {
    
    authRouter.route('/signUp')
        .post(function(req, res){
            console.log(req.body); 
            // put in checking the user here
        });
    
    return authRouter;
};

module.exports = router;