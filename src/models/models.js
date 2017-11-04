var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CatHaxDB');

var Group =
    mongoose.model('Group', require('./group.js'), 'groups');
var User =
    mongoose.model('User', require('./user.js'), 'users');

var models = {
    User: User,
    Group: Group
}

module.exports = models;

