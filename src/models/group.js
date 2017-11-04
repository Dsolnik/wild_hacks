var mongoose = require('mongoose');

var groupSchema = {
    name: { type: String, required: true },
    users: [{ 
        name: { type: String},
        _id: { type: String },
        score: { type: Number }, //64 bit floating
        record: [[{ type: Number }]],
        target: { type: Number },
    }],
    groupCalendar: [[{type: Number}]]
};

module.exports = new mongoose.Schema(groupSchema);