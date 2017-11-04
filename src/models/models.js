var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CatHaxDB');

var Group =
    mongoose.model('Group', require('./group.js'), 'groups');
var User =
    mongoose.model('User', require('./user.js'), 'users');

module.exports.User = User;
module.exports.Group = Group;

module.exports = models;
