const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const app = express();
require('dotenv').config();

const dataBaseClass = require('./app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

const userTokenClass = require('./app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(

    cookieSession({
      name: "otis-ai-session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true
    })
    
);


// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/new-user', (req, res) => {
    res.sendFile(__dirname + '/views/new-user.html');
});

app.post('/new-user', async (req, res) => {
  
    dataBase.createUser(req, res);

});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {

    const token = await userToken.createToken(req, res);

});

app.get('/user-account', (req, res) => {
    console.log(req.rawHeaders);
    res.json({test: "test"});
})

function authToken(req, res, next) {

    const token = null;

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }

    /*const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {

            return res.sendStatus(403);

        } else {

            req.user = user;
            next();

        }
    })*/

} 

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});