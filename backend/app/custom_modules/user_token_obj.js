const env = require('dotenv').config({ path: '../.env' });
const strHasher = require('./str_hasher');
const jwt = require("jsonwebtoken");
const dataBaseObj = require('./database_obj');

const userTokenObj = {

    async checkUserLogin(usernameToCheck, passwordToCheck) {

        console.log('init checkUserLogin from userTokenObj');

        /*
        console.log(usernameToCheck);
        console.log(passwordToCheck);
        */

        const usernameInDB = await dataBaseObj.findUserByName(usernameToCheck);
        //console.log(usernameInDB);

        if (usernameInDB.length === 0) {

            console.log('Error: invalid username');
            return false;

        } else {

            console.log('User exist in DB');
            const userToCheckAuth = usernameInDB[0];
            const hashObj = await dataBaseObj.getUserPsw(userToCheckAuth._id);

            /*
            console.log('test hashObj');
            console.log(hashObj);
            */

            const checkHash = await strHasher.method.checkHash(passwordToCheck, hashObj.password);

            if (!checkHash) {

                console.log('Error: invalid password');
                return false;

            } else {
                console.log('Password is valid, auth OK');
                return true;
            }

        }

    }


}

module.exports = userTokenObj;