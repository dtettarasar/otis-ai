const env = require('dotenv').config();
const strHasher = require('./str_hasher');
const jwt = require("jsonwebtoken");

const dataBaseClass = require('../config/db.config');
const dataBase = new dataBaseClass();

class UserToken {

    async checkUserAuth (req, res) {

        // Data filled by the user on the login form
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

            const userToCheckAuth = usernameInDB[0];

            const hashObj = await dataBase.getUserPsw(userToCheckAuth._id);
            //console.log(hashObj);

            const checkHash = await strHasher.method.checkHash(userObj.password, hashObj.password);
            //console.log(checkHash);

            if (!checkHash) {

                console.log('Error: invalid password');
                res.json({Error: "invalid login"});
                return false;

            }

            return usernameInDB[0];

        }

    }

    async createToken (req, res) {

        //Get the user for which we create the token
        const user = await this.checkUserAuth(req, res);

        if (user) {

            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'});

            res.cookie("token", accessToken, {
                httpOnly: true
            });

            return res.redirect("/user/account");
        }
    }

    authToken(req, res, next) {

        const token = req.cookies.token;
    
        try {
    
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = user;
            next();
    
        } catch (err) {
    
            res.clearCookie("token");
            return res.redirect("/user/login");
            
        }
    
    }

} 

module.exports = UserToken;