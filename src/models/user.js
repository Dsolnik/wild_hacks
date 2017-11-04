var mongoose = require('mongoose');
var scripts  = require('../config/dbScripts');

module.exports = new mongoose.Schema({
    info: {
        name: { type: String, required: true },
        email: { type: String },
        password: { type: String },
        // more later? ie payment info
    },
    start_date: { type: Date},
    current_date: { type: Date},
    record: [{ type: Number }],
    groups: [{
        _id: { type: Number }
    }]
});