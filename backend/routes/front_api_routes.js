// handle api routes for the front end client

const express = require('express');
const router = express.Router();
const dataBaseObj = require('../app/custom_modules/database_obj');
const userTokenObj = require('../app/custom_modules/user_token_obj');

router.post('/user-login', async (req, res) => {
    console.log('test post request');
    //console.log(req);

    const userObj = {
        username: req.body.username,
        password: req.body.password,
        authOk: null
    }

    const testUserAuth = await userTokenObj.checkUserLogin(userObj.username, userObj.password); 

    console.log("test user auth");
    console.log(testUserAuth);

    res.json(userObj);
});

module.exports = router;