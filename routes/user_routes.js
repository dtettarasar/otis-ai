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

router.get('/my-account', userToken.authToken, async (req, res) => {

    const tokenData = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    }

    const userInfo = {
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id'])
    };

    /*
    TODO: 

    - ne passer dans le token que le userID

    - créer dans db.config.js une fonction qui permet de récup le username et le credit pour la page my account

    - récupérer ici le userID pour faire une requête dans laquelle on va récupérer les données à afficher sur la page à savoir le username et le solde de crédit.

    - dans render, inutile de passer tous les éléments comme les token, ne passer que les infos dont on a besoin pour la view (username + crédit).
    
    */
    
    console.log("access to /my-account route");
    console.log(userInfo);

    res.render('user/user-account', userInfo);
    
})

router.get('/add-credits', userToken.authToken, async (req, res) => {

    const tokenData = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    }

    const userInfo = {
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id'])
    };

    console.log("access to /add-credits");
    console.log(userInfo);

    res.render('user/add-credits', userInfo);

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

router.post('/add-api-key', userToken.authToken, dataBase.addApiKey, (req, res) => {

    /*
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
    */

    res.send('test add api key');

})

module.exports = router;