var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
    //connects to MongoDB database on the mongoose instance
    mongoose.connect('mongodb://localhost:27017/CatHaxDB')

    // registers the db connection with wagner dependencies
    //so that it can be accessed elsewhere
    wagner.factory('db', function() {
        return mongoose;
    });

    var Group = 
        mongoose.model('Group', require('./group.js'), 'groups');
    var User = 
        mongoose.model('User', require('./user.js'), 'users');

    var models = {
        User: User,
        Group: Group
    }

    _.each(models, function(value, key){
        wagner.factory(key, function () {
            return value;
        });
    });

    return models;
};