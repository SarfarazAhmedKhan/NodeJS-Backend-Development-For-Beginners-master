var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    hash: String,
    created_at: { type: Date, default: Date.now }
}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema); 