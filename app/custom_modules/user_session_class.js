const env = require('dotenv').config();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');

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
        const userHashedPsw = await dataBase.getUserPsw(usernameInDB[0]._id);
        console.log(userHashedPsw);

    }

    async createSession (req, res) {

        const checkPSw = await checkUserPsw(req, res);
        
        res.json(userObj);
    }

} 

module.exports = UserSession;