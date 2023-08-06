const mongoose = require("mongoose");

const UserSch = new mongoose.Schema({
    username: {type: String, required: true}, 
    email: {type: String, required: true},
    password: {type: String, required: true},
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