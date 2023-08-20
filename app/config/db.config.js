const env = require('dotenv').config();
const mongoose = require('mongoose');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');

class DataBase {

    constructor (dbUrl) {

        this.dbUrl = dbUrl;

    }

    async initDB() {

        console.log("init db");

        
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

        //this.searchUserByEmail();
    
        
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

/*
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

        this.searchUserByEmail();
    
        
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
        
        console.log("search user by email method");

    }

}
*/

/*
const dataBase = new DataBase(process.env.DB_URL);
//console.log(dataBase);
dataBase.initDB();
*/


//databaseObj.initDB();

//exports.obj = databaseObj;
module.exports = DataBase;
