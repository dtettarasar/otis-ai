require('dotenv').config()
const mongoose = require('mongoose');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');

const databaseObj = {

    roleDoc: roleModel,
    userDoc: userModel,

    initDB: async () => {

        try {
            const connect = await mongoose.connect(process.env.DB_URL);
            console.log("Successfully connect to MongoDB.");
        } catch (err) {
            console.error("Connection error", err);
            process.exit();
        }
    },

    createUser: async (req, res) => {

        const userObj = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.psw
        });
    
        
        try {

            const user = await userObj.save();
            console.log(user);
            res.json(user);

        } catch (err) {
    
            console.log(err);
            res.json({Error: err});
    
        }

    }, 

    searchUserByName: async (req, res) => {

    },

    searchUserByEmail: async (req, res) => {
        
    }

}

exports.obj = databaseObj;
