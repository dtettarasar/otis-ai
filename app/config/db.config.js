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

        // Check if username already exist in database
        const usernameInDB = await this.findUserByName(userObj.username);

        // Check if email already exist in database
        const emailInDB = await this.findUserByEmail(userObj.email);

        if (usernameInDB.length !== 0) {

            console.log("username already exist in database");
            console.log(usernameInDB);

            res.json({Error: "username already used"});

        }   else if (emailInDB.length !== 0) {

            console.log('email already exist in database');
            console.log(emailInDB);

            res.json({Error: "email already used"});

        } else {
            
            console.log("username & email doesn't exist in database");

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

    async findUserByName(userName) {

        const query = UserModel.find({username: userName});
        query.select('username email');
        const userFound = await query.exec();

        return userFound;

    }

    async findUserByEmail(userEmail) {

        const query = UserModel.find({email: userEmail});
        query.select('username email');
        const userFound = await query.exec();

        return userFound;

    }

}

module.exports = DataBase;
