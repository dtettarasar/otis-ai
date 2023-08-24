const env = require('dotenv').config();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const strHasher = require('./str_hasher');

const dataBaseClass = require('../config/db.config');
const dataBase = new dataBaseClass();

class UserSession {

    async checkUserAuth (req, res) {

        const userObj = {
            username: req.body.username,
            password: req.body.psw
        };

        const usernameInDB = await dataBase.findUserByName(userObj.username);

        if (usernameInDB.length === 0) {

            console.log('Error: invalid username')
            res.json({Error: "invalid login"});
            return false;
            
        } else {

            const hashObj = await dataBase.getUserPsw(usernameInDB[0]._id);
            console.log(hashObj);

            const checkHash = await strHasher.method.checkHash(userObj.password, hashObj.password);
            console.log(checkHash);

            if (!checkHash) {

                console.log('Error: invalid password');
                res.json({Error: "invalid login"});
                return false;

            }

            return checkHash;

        }

    }

    async createSession (req, res) {

        const checkAuth = await this.checkUserAuth(req, res);

        if (checkAuth) {
            res.json({Success: "login is valid"});
        }
    }

} 

module.exports = UserSession;