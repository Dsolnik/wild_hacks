var passport = require('passport');

var passportFunction = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());
      
};
    
module.exports = passportFunction;