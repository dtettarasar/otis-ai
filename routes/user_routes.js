const express = require('express');
const router = express.Router();

const userTokenClass = require('../app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const dataBaseClass = require('../app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

router.get('/test', (req, res) => {
    res.send('test user route');
})

router.get('/register', (req, res) => {
    res.render('user/new-user');
});

router.post('/register', async (req, res) => {
  
    dataBase.createUser(req, res);

});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', userToken.checkUserAuth, userToken.createToken, userToken.createRefreshToken, async (req, res) => {

    return res.redirect("/user/my-account");

});

router.get('/logout', userToken.authToken, userToken.logout, (req, res) => {

    return res.redirect("/");

});

router.post('/refresh-token', userToken.authToken, userToken.authRefreshToken, (req, res) => {

    return res.redirect("/user/my-account");
    
})

router.get('/my-account', userToken.authToken, (req, res) => {

    const userInfo = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    }
    
    console.log("access to /my-account route");
    console.log(userInfo);

    res.render('user/user-account', userInfo);
    
})

router.get('/api-keys' , userToken.authToken, (req, res) => {

    const userInfo = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    }

    console.log("access to /api-keys route");
    console.log(userInfo);

    res.render('user/api-keys', userInfo);
    
})

router.post('/add-api-key', userToken.authToken, (req, res) => {

    console.log("req body: ")
    console.log(req.body);

    const apiKeyData = {
        keyName: req.body.keyname,
        orgId: req.body.orgid,
        secretKey: req.body.secretkey,
        primaryKey: req.body.primarykey === 'true' ? true : false,
        userId: req.user._id
    }

    console.log("api Key Data");
    console.log(apiKeyData);

    res.json(apiKeyData);

})

module.exports = router;