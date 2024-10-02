const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Ensure username is unique
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    age: { type: Number,  }, // Age should be a number
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
