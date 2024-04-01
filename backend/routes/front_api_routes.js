// handle api routes for the front end client

const express = require('express');
const router = express.Router();
const dataBaseObj = require('../app/custom_modules/database_obj');

router.post('/user-login', async (req, res) => {
    console.log('test post request');
    //console.log(req);

    const userObj = {
        existInDB: null,
        username: req.body.username,
        password: req.body.password
    }

    const usernameInDB = await dataBaseObj.findUserByName(userObj.username);
    console.log(usernameInDB);

    if (usernameInDB.length === 1 && usernameInDB[0].username === userObj.username) {
        userObj.existInDB = true;
    } else {
        userObj.existInDB = false;
    }

    res.json(userObj);
});

module.exports = router;