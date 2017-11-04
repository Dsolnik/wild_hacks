var mongoose = require('mongoose');

var groupSchema = {
    name: { type: String, required: true },
    secret: { type: String},
    target : { type: Number },
    users: [{ 
        name: { type: String},
        _id: { type: String },
        score: { type: Number }, //64 bit floating
        record: [[{ type: Number }]],
    }],
    groupCalendar: [[{type: Number}]]
};

module.exports = new mongoose.Schema(groupSchema);