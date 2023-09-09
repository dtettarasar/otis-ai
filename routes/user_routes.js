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

router.post('/login', userToken.checkUserAuth, userToken.createToken, async (req, res) => {

    //const token = await userToken.createToken(req, res);

    return res.redirect("/user/my-account");

    /*
    const userObj = {
        username: req.body.username,
        password: req.body.psw
    };*/

    //const testUser = await userToken.checkUserAuth(req, res);
    //console.log(testUser);

    //res.json({test: 'test'});

});

router.get('/my-account', userToken.authToken, (req, res) => {

    const userInfo = {
        Success: true,
        AccessToken: req.cookies.token,
        user: req.user
    }
    
    res.render('user-account', userInfo);
    
})

module.exports = router;