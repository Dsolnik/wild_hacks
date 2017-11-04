var mongoose = require('mongoose');

var userSchema = {
    info: {
        name: { type: String, required: true },
        email: { type: String },
        password: {type: String},
        oauth: { type: String }
        // more later? ie payment info
    },
    groups: [{
        id: { type: Number }
    }]

};

module.exports = new mongoose.Schema(userSchema);