var mongoose = require(mongoose);


var Group = 
    mongoose.model('Group', require('./group.js'), 'groups');

var User = 
    mongoose.model('User', require('./user.js'), 'users');

var models = {
    User: User,
    Group: Group
}