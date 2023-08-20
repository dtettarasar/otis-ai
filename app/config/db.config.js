const env = require('dotenv').config();
const mongoose = require('mongoose');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');

class DataBase {

    constructor () {

        this.dbUrl = process.env.DB_URL;

    }

    async initDB() {

        try {
            const connect = await mongoose.connect(this.dbUrl);
            console.log("Successfully connect to MongoDB.");
        } catch (err) {
            console.error("Connection error", err);
            process.exit();
        }
        

    }

    async createUser(req, res) {

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

    }

}

module.exports = DataBase;
