var passport = require('passport');

var passportFunction = function(app) {

    app.use(passport.initalize());
    app.use(passport.session());
      
};
    
module.exports = passportFunction;