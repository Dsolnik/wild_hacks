var mongoose = require('mongoose');
var scripts  = require('../config/dbScripts');

var userSchema = {
    info: {
        name: { type: String, required: true },
        email: { type: String },
        password: { type: String},
        start_date: { type: String},
        record: [ {type: Object} ]
        // more later? ie payment info
    },
    groups: [{
        id: { type: Number }
    }]

};

module.exports = new mongoose.Schema(userSchema);