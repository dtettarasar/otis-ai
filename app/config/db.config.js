const env = require('dotenv').config();
const mongoose = require('mongoose');
const roleModel = require('../models/role.model');
const UserModel = require('../models/user.model');

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

        const userObj = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.psw
        });

        const usernameInDB = await this.findUserByName(userObj.username);
        console.log("check if username already exist");
        console.log(usernameInDB);
        
        try {

            const user = await userObj.save();
            console.log(user);
            res.json(user);
            
        } catch (err) {
    
            console.log(err);
            res.json({Error: err});
    
        }

    }

    async findUserByName(username) {

        //console.log("find username method");
        //console.log("username to check: " + username);

        const query = UserModel.find({username: username});
        query.select('username');
        const userFound = await query.exec();
        //console.log(typeof userFound);

        return userFound;


    }

}

module.exports = DataBase;
