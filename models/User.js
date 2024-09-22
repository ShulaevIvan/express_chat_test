const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    connected: {
        type: Boolean,
        required: false
    },
    chatId: {
        type: String
    }
});


module.exports = mongoose.model('users', userSchema);