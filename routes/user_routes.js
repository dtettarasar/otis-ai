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
    //res.sendFile(__dirname + '/views/new-user.html');
    res.render('new-user');
});

router.post('/register', async (req, res) => {
  
    dataBase.createUser(req, res);

});

router.get('/login', (req, res) => {
    //res.sendFile(__dirname + '/views/login.html');
    res.render('login');
});

router.post('/login', userToken.checkUserAuth, userToken.createToken, userToken.createRefreshToken, async (req, res) => {

    return res.redirect("/user/my-account");

});

router.post('/refresh-token', userToken.authToken, userToken.authRefreshToken, (req, res) => {

    return res.redirect("/user/my-account");
    
})

router.get('/my-account', userToken.authToken, (req, res) => {

    const userInfo = {
        Success: true,
        AccessToken: req.cookies.token,
        user: req.user
    }
    
    res.render('user-account', userInfo);
    
})

module.exports = router;