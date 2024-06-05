// handle api routes for the front end client

const express = require('express');
const router = express.Router();
const dataBaseObj = require('../app/custom_modules/database_obj');
const userTokenObj = require('../app/custom_modules/user_token_obj');
const strEncrypter = require('../app/custom_modules/str_encrypter');
const stripeApiObj = require('../app/custom_modules/stripe_api_obj');

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

        const accessToken = await userTokenObj.createToken(checkAuth, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXP);
        const refreshToken = await userTokenObj.createToken(checkAuth, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXP);

        userObj.authSuccess = checkAuth.authSuccess;
        userObj.accessToken = accessToken;
        userObj.refreshToken = refreshToken;

    }

    console.log('user obj from user login route');
    console.log(userObj);

    res.json(userObj);
});

router.post('/user-create', async (req, res) => {

    console.log('post req from user-create route');
    console.log(req.body);

    const userCreation = await dataBaseObj.createUser(req.body.username, req.body.email, req.body.password);
    console.log(userCreation);

    res.send(userCreation.creationStatus);

});

router.post('/user-add-credits', async (req, res) => {

    console.log('post request from the add credits route');

    const reqObj = {
        test: 'response from user-add-credits',
        creditQuantity: req.body.creditQuantity,
        accessToken: req.body.accessToken,
        checkoutSessionUrl: null
    }

    const tokenData = userTokenObj.authToken(reqObj.accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (tokenData.result.authSuccess) {

        const decryptUserID = await strEncrypter.method.decryptString(tokenData.result.userIdEncryption);
        const checkoutSession = await stripeApiObj.createCheckoutSession(decryptUserID, reqObj.creditQuantity);

        console.log(checkoutSession);

        if (checkoutSession.creationStatus) {

            reqObj.checkoutSessionUrl = checkoutSession.stripeResponse.url;

        }

    }

    res.json(reqObj);

});

router.post('/user-create-article', async (req, res) => {

    /*

    Todo : create an article in the backend

    This article should be provided with basic dummy content:
    title: untitled
    description: write a brief description of your article
    Content: basic lorem ipsum written in markdown

    Once the article is created, get the id of the article object created in mongoDB
    Encrypt this id
    send the encrypted id the in the format: iv_enrcyptId
    this new string will be used as the link for the vue client to view the article. 
    
    */

    console.log('post request to create article');

    const articleObj = {

        title: 'Untitled',
        description: 'This is a brief description for your article',
        markdown: 'Write some text here: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada. ',
        otisUserId: null,
        encryptedIdStr: null

    };


    const accessToken = req.body.accessToken;

    //console.log(accessToken);

    const tokenData = userTokenObj.authToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (tokenData.result.authSuccess) {

        const decryptUserID = await strEncrypter.method.decryptString(tokenData.result.userIdEncryption);
        // console.log('decryptUserId: ' + decryptUserID);

        articleObj.otisUserId = decryptUserID;

        const articleCreation = await dataBaseObj.createArticle(articleObj.title, articleObj.description, articleObj.markdown, articleObj.otisUserId);

        // console.log(articleCreation);
        // console.log('article id: ' + articleCreation._id);

        const encryptedArticleId = await strEncrypter.method.encryptString(articleCreation._id.toHexString());
        
        // console.log('encryptedArticleId: ');
        // console.log(encryptedArticleId);

        articleObj.encryptedIdStr = `${encryptedArticleId.iv}_${encryptedArticleId.encryptedStr}`;

    }

    res.json({
        message: 'post request to create article',
        accessToken: accessToken,
        articleId: articleObj.encryptedIdStr
    })

});

router.get('/retrieve-article-data', async (req, res) => {

    console.log('get request for article data route');

    console.log('req query');
    console.log(req.query);

    res.json({
        route: 'retrieve-article-data',
        articleId: req.query.articleId
    });

});

router.get('/user-auth', async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const tokenAuthentication =  userTokenObj.authToken(token, process.env.ACCESS_TOKEN_SECRET);

    /*
    console.log('tokenAuthentication');
    console.log(tokenAuthentication);
    */

    if (tokenAuthentication.status) {
        delete tokenAuthentication.result._id;
    }

    //console.log('json sent to the vue app:')
    //console.log(tokenAuthentication);
    res.json(tokenAuthentication);

});

router.get('/refresh-token', async (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const refreshTokenAuthentication =  await userTokenObj.authRefreshToken(token, process.env.REFRESH_TOKEN_SECRET);

    if (refreshTokenAuthentication.authSuccess) {

        console.log('refreshTokenAuthentication: '); 
        console.log(refreshTokenAuthentication);

        const accessToken = await userTokenObj.createToken(refreshTokenAuthentication, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXP);

        res.json({
            responsefromApi: 'ok',
            tokenReceivedInBackend: token,
            newToken: accessToken
        });

    } else {

        res.json({
            responsefromApi: 'error',
            tokenReceivedInBackend: token,
            newToken: false
        });

    }

});

router.get('/user-datas', async (req, res) => {

    console.log('got request for user-datas route');

    const userIdObj = req.query.userId;
    console.log('User ID object:', userIdObj);

    const decryptUserID = await strEncrypter.method.decryptString(userIdObj);
    console.log('decryptUserID: ' + decryptUserID);

    // check that the user exist in db
    const findUser = await dataBaseObj.findUserById(decryptUserID);
    console.log(findUser);

    const userData = {
        username: findUser.username,
        credit: findUser.credit
    }

    //res.status(200).send('User ID object received successfully');
    res.json(userData);

});

// To do

/*
Créer une route get pour fournir le username à l'appli vue js

Requête vers le backend pour récupérer le nom d'utilisateur : Le backend reçoit l'ID utilisateur crypté via une route GET, le déchiffre,
puis effectue une requête pour récupérer le nom d'utilisateur à partir de l'ID utilisateur déchiffré.
*/

module.exports = router;