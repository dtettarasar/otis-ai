// handle api routes for the front end client

const express = require('express');
const router = express.Router();
const dataBaseObj = require('../app/custom_modules/database_obj');
const userTokenObj = require('../app/custom_modules/user_token_obj');

router.post('/user-login', async (req, res) => {

    /*
        Get the user information from the Vue Login component
        Check the values provided, to see if it matches with an account stored in mongoDB
        If a user is found and the password is valid then create the access token and refresh token
        return the tokens to the vue app
    */

    const userObj = {
        username: req.body.username,
        password: req.body.password,
        authSuccess: false,
        accessToken: null
    }

    const checkAuth = await userTokenObj.checkUserLogin(userObj.username, userObj.password);

    if(checkAuth.authSuccess) {

        const accessToken = await userTokenObj.createToken(checkAuth);

        userObj.authSuccess = checkAuth.authSuccess;
        userObj.accessToken = accessToken;

    }

    res.json(userObj);
});

module.exports = router;