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

    const articles = [
        {
            title: "article 1 title",
            createdAt: new Date().toLocaleDateString(),
            description: "article description"
        },
        {
            title: "article 2 title",
            createdAt: new Date().toLocaleDateString(),
            description: "article description"
        }
    ]

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id']),
        userArticles: articles
    };

    console.log("access to article route");
    console.log(userInfo);

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

})

router.post('/create', userToken.authToken, async (req, res) => {
    
})

module.exports = router;