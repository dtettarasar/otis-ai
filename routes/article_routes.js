const express = require('express');
const router = express.Router();

const userTokenClass = require('../app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const dataBaseClass = require('../app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

const aiArticleCreator = require('../app/custom_modules/ai_article_creator');

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
        credit: await dataBase.getUserCrd(req.user['_id']),
        article: {
            title: "",
            description: "",
            markdown: ""
        }
    };

    console.log("access to new article route");
    console.log(userInfo);

    res.render('article/new-article', userInfo);

});

router.get('/edit/:id', userToken.authToken, async (req, res) => {

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id']),
        article: await dataBase.findArticleById(req.params.id)
    };

    console.log("access to edit article route");
    console.log(userInfo);

    res.render('article/edit-article',  userInfo);

});

router.get('/:id', userToken.authToken, async (req, res) => {

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id'])
    };

    let articleisOwnbyUser = null;
    console.log(userInfo);

    try {
        userInfo.articleData = await dataBase.findArticleById(req.params.id);

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

router.post('/create-ai', userToken.authToken, async (req, res) => {

    //const article = await dataBase.createArticle(req, res);

    // todo créer ici fonction pour checker la valeur de req.body.keywords_params
    // S'assurer que c'est convertible en json et que le format respecte bien ce dont on a besoin pour la suite du process
    // un objet avec des des attributs "keyword-tag-int" et en valeur des chaines de caractères, sans caractères spéciaux

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id'])
    };

    let keywordsParams = {};

    try {

        keywordsParams = JSON.parse(req.body.keywords_params);

    } catch (err) {

        console.log("error when converting keywordsParams from str to json");
        console.log(err);

    }

    const articleParams = {
        description: req.body.description,
        keywords: keywordsParams
    }

    userInfo.articleParams = articleParams;

    console.log(userInfo);
    console.log("aiArticleCReator");
    console.log(aiArticleCreator);

    const prompt = aiArticleCreator.generatePrompt(["hokuto no ken", "post-apocalyptic fiction", "mad max"], 'en');
    console.log(prompt);

    const article = await aiArticleCreator.generateArticle(prompt);
    console.log(article);

    res.redirect('/article');
})

router.put('/update/:id', userToken.authToken, async (req, res) => {

    //const article = await dataBase.createArticle(req, res);
    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        article: await dataBase.findArticleById(req.params.id) 
    };

    const test = await dataBase.updateArticle(req, res);

    if (test) {

        userInfo.article = await dataBase.findArticleById(req.params.id);
        res.redirect(`/article/${req.params.id}`);
        //res.json(userInfo);

    } else {

        res.json({
            err: "can't update article"
        });

    }


    //res.json(userInfo);
})

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);

    const deleteArticle = dataBase.deleteArticle(req.params.id);

    if (deleteArticle) {
        console.log(`Article (ID: ${req.params.id}) has been deleted`);
    } else {
        console.log(`Error: Article (ID: ${req.params.id}) can't be deleted`);
    }

    res.redirect('/article');
})

module.exports = router;