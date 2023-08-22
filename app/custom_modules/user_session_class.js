const env = require('dotenv').config();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');

const dataBaseClass = require('../config/db.config');
const dataBase = new dataBaseClass();

class UserSession {

    constructor () {

    }

    async checkHash (strToCheck, hashToCheck) {

        bcrypt.compare(strToCheck, hashToCheck, (err, isMatch) => {

            if (err) {
                console.log(err);
              } else if (!isMatch) {
                console.log("Password doesn't match!");
              } else {
                console.log("Password matches!");
              }

        })

    }

    async checkUserPsw (req, res) {

        const userObj = {
            username: req.body.username,
            password: req.body.psw
        };

        const usernameInDB = await dataBase.findUserByName(userObj.username);

        if (usernameInDB.length === 0) {

            res.json({Error: "invalid username"});
            
        } else {

            const hashObj = await dataBase.getUserPsw(usernameInDB[0]._id);
            console.log(hashObj);

            await this.checkHash(userObj.password, hashObj.password);

        }

    }

    async createSession (req, res) {

        const checkPsw = await this.checkUserPsw(req, res);

        res.json({test: "test"});
    }

} 

module.exports = UserSession;