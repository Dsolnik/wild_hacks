var mongoose = require('mongoose');

var userSchema = {
    _id: { type: String },
    info: {
        name: { type: String, required: true },
        email: { type: String },
        oauth: { type: String, required: true }
        // more later? ie payment info
    },
    groups: [{
        id: { type: Number }
    }]

};

module.exports = new mongoose.Schema(userSchema);