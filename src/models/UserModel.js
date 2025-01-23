
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};