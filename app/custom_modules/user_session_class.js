const env = require('dotenv').config();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const strHasher = require('./str_hasher');

const dataBaseClass = require('../config/db.config');
const dataBase = new dataBaseClass();

class UserSession {

    constructor () {

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

            const checkHash = await strHasher.method.checkHash(userObj.password, hashObj.password);
            console.log(checkHash);

        }

    }

    async createSession (req, res) {

        const checkPsw = await this.checkUserPsw(req, res);

        res.json({test: "test"});
    }

} 

module.exports = UserSession;