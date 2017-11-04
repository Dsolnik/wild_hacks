/*jshint node: true */

var express = require('express');
var authRouter = express.Router();

var router = function() {
    
    authRouter.route('/signUp')
        .post(function(req, res){
            console.log('signup here', req.body);
            // insert the user into the database HERE
            // replace req.body with the object of the user
            req.login(req.body, function(){
                res.redirect('/auth/dashboard');
            });
        // put in checking the user here
            res.end();
        });
    
    authRouter.route('/dashboard')
        .get(function(req, res){
            res.json(req.user);
        });
    
    return authRouter;
};

module.exports = router;