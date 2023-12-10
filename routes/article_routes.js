const express = require('express');
const router = express.Router();

const userTokenClass = require('../app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const dataBaseClass = require('../app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

router.get("/", userToken.authToken, async (req, res) => {

    const tokenData = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    };

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id']),
        userArticles: []
    };

    const userArticles = await dataBase.getUserArticles(userInfo.userId);

    if (userArticles.length !== 0) {
        userInfo.userArticles = userArticles;
    }

    /*
    console.log("access to article route");
    console.log(userInfo);
    */

    res.render('article/my-article', userInfo);

});

router.get('/new', userToken.authToken, async (req, res) => {

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id'])
    };

    console.log("access to new article route");
    console.log(userInfo);

    res.render('article/new-article');

});

router.get('/:slug', userToken.authToken, async (req, res) => {

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id'])
    };

    let articleisOwnbyUser = null;
    console.log(userInfo);

    try {
        userInfo.articleData = await dataBase.findArticleBySlug(req.params.slug);

        // make sure the user doesn't access to someone else's article
        articleisOwnbyUser = userInfo.userId.toString() === userInfo.articleData.otisUserId.toString();

        if (articleisOwnbyUser) {

            //res.json(userInfo);
            console.log("access to view article route");
            console.log(userInfo);
            res.render('article/show', userInfo);


        } else {

            console.log("user tried to access someone else's article");
            res.redirect('/article');

        }

        
    } catch (err) {
        console.log(err);
        res.redirect('/article');
    }

});

router.post('/create', userToken.authToken, async (req, res) => {

    const article = await dataBase.createArticle(req, res);
})

module.exports = router;