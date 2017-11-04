var mongoose = require('mongoose');

var userSchema = {
    _id: { type: String },

}

module.exports = new mongoose.Schema(userSchema);