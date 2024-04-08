const env = require('dotenv').config({ path: '../.env' });
const strHasher = require('./str_hasher');
const jwt = require("jsonwebtoken");
const dataBaseObj = require('./database_obj');

const userTokenObj = {

    async checkUserLogin(usernameToCheck, passwordToCheck) {

        const userLoginData = {
            username: null,
            _id: null,
            authSuccess: false
        }

        console.log('init checkUserLogin from userTokenObj');

        const usernameInDB = await dataBaseObj.findUserByName(usernameToCheck);

        if (usernameInDB.length === 0) {

            console.log('Error: invalid username');

        } else {

            console.log('User exist in DB');
            const userToCheckAuth = usernameInDB[0];
            const hashObj = await dataBaseObj.getUserPsw(userToCheckAuth._id);

            const checkHash = await strHasher.method.checkHash(passwordToCheck, hashObj.password);

            if (!checkHash) {

                console.log('Error: invalid password');

            } else {
                console.log('Password is valid, auth OK');
                userLoginData.authSuccess = true;
                userLoginData._id = userToCheckAuth._id;
                userLoginData.username = userToCheckAuth.username;
            }

        }

        return userLoginData;

    },

    async createToken (user, secretKey, expirationTime) {

        //Get the user for which we create the token
        // Data filled by the user on the login form

        if (user) {

            const accessToken = jwt.sign(user, secretKey, {expiresIn: expirationTime});
            return accessToken;

        } else {

            console.error("create token error");
            return false;

        }
    },

    authToken (token) {

        // console.log('init authToken method')

        const authTokenObj = {
            token: token,
            status: null,
            result: {}
        }

        try {

            const tokenVerification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            authTokenObj.status = true;
            authTokenObj.result = tokenVerification;

        } catch(err) {

            // console.log(err);
            authTokenObj.status = false;
            authTokenObj.result.name = err.name;
            authTokenObj.result.message = err.message;

        }

        // console.log(authTokenObj);
        // console.log('end of authToken method');

        return authTokenObj;

    }


}

module.exports = userTokenObj;