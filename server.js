const express = require('express');
const cors = require('cors');
//const cookieSession = require("cookie-session");
const app = express();
require('dotenv').config();

const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
app.use(cookies());

const dataBaseClass = require('./app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

const userTokenClass = require('./app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const corsOptions = {
    origin: "http://localhost:8081"
}

app.set('view engine', 'ejs');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index');
});

app.get('/new-user', (req, res) => {
    //res.sendFile(__dirname + '/views/new-user.html');
    res.render('new-user');
});

app.post('/new-user', async (req, res) => {
  
    dataBase.createUser(req, res);

});

app.get('/login', (req, res) => {
    //res.sendFile(__dirname + '/views/login.html');
    res.render('login');
});

app.post('/login', async (req, res) => {

    const token = await userToken.createToken(req, res);

});

app.get('/user-account', userToken.authToken, (req, res) => {
    
    res.json({
        Success: true,
        AccessToken: req.cookies.token,
        user: req.user
    });
    
})


/* This is to understand concept of middleware and the use of next() */
const middlewareOne = (req, res, next) => {
    console.log('middleware 1');
    next();
}

const middlewareTwo = (req, res, next) => {
    console.log('middleware 2');
    next();
}

app.get('/test-middleware', middlewareTwo, middlewareOne, (req, res) => {
    res.json({test: "test"});
})
/* ----------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});