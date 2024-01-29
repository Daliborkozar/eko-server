const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: String,
        Admin: String,
        SuperAdmin: String
    },
    password: {
        type: String,
        required: true
    },
    organization: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
     isActive: {
        type: Boolean,
        default: true
    },
    displayName: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
    refreshToken: [String]
});

module.exports = mongoose.model('User', userSchema);
