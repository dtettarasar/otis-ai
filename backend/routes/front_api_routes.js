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
        accessToken: null,
        refreshToken: null
    }

    const checkAuth = await userTokenObj.checkUserLogin(userObj.username, userObj.password);

    if(checkAuth.authSuccess) {

        const accessToken = await userTokenObj.createToken(checkAuth, process.env.ACCESS_TOKEN_SECRET, '2m');
        const refreshToken = await userTokenObj.createToken(checkAuth, process.env.REFRESH_TOKEN_SECRET, '4h');

        userObj.authSuccess = checkAuth.authSuccess;
        userObj.accessToken = accessToken;
        userObj.refreshToken = refreshToken;

    }

    console.log('user obj from user login route');
    console.log(userObj);

    res.json(userObj);
});

router.get('/user-auth', async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const tokenAuthentication =  userTokenObj.authToken(token);
    console.log('tokenAuthentication');
    console.log(tokenAuthentication);

    if (tokenAuthentication.status) {
        delete tokenAuthentication.result._id;
    }

    console.log('json sent to the vue app:')
    console.log(tokenAuthentication);
    res.json(tokenAuthentication);

})

module.exports = router;