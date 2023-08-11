require('dotenv').config()
const mongoose = require('mongoose');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');

const databaseObj = {

    initDB: async () => {

        try {
            const connect = await mongoose.connect(process.env.DB_URL);
            console.log("Successfully connect to MongoDB.");
        } catch (err) {
            console.error("Connection error", err);
            process.exit();
        }
    },

    createUser: async () => {

        

    },

    roleDoc: roleModel,
    userDoc: userModel

}

exports.config = databaseObj;
