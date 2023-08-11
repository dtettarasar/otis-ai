const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
/*
const strHasher = require("../../custom_modules/str_hasher.js");
console.log(strHasher);
const password = "mypass123";
strHasher.config.getHash(password);
*/

//console.log('user model');

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

// pre middleware function, to hash users' passwords
/*
UserSch.pre("save", (next) => {

    const user = this;

    if (this.isNew) {

        bcrypt.genSalt(10, (saltErr, salt) => {

            if (saltErr) {

                return next(saltErr);

            } else {

                bcrypt.hash(user.password, salt, (hashErr, hash) => {

                    if (hashErr) {

                        return next(hashErr);

                    } else {

                        user.password = hash;
                        next();

                    }

                })

            }

        })

    }

})
*/

const User = mongoose.model(
    "User", UserSch
);

module.exports = User;