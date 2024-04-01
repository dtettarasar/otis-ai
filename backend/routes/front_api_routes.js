// handle api routes for the front end client

const express = require('express');
const router = express.Router();
const dataBaseObj = require('../app/custom_modules/database_obj');
const userTokenObj = require('../app/custom_modules/user_token_obj');

router.post('/user-login', async (req, res) => {

    const userObj = {
        username: req.body.username,
        password: req.body.password,
        authOk: null
    }

    userObj.authOk = await userTokenObj.checkUserLogin(userObj.username, userObj.password); 

    res.json(userObj);
});

module.exports = router;