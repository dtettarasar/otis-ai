const mongoose = require("mongoose");

const UserSch = new mongoose.Schema({
    username: String, 
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

const User = mongoose.model(
    "User", UserSch
);

module.exports = User;