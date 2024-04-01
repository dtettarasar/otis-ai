const env = require('dotenv').config({ path: '../.env' });
const strHasher = require('./str_hasher');
const jwt = require("jsonwebtoken");
const dataBaseObj = require('./database_obj');

const userTokenObj = {

    async checkUserLogin(username, password) {

        console.log('init checkUserLogin from userTokenObj');

        console.log(username);
        console.log(password);

        const usernameInDB = await dataBaseObj.findUserByName(username);
        console.log(usernameInDB);

        if (usernameInDB.length === 0) {
            
            console.log('Error: invalid username');
            return false;

        } else {

            console.log('user exist in DB');

        }

        console.log('end of checkUserLogin');

        return null;

    }


}

module.exports = userTokenObj;