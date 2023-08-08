const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const app = express();

const dataBase = require('./app/config/db.config');
dataBase.config.initDB();

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

app.post('/new-user', (req, res) => {
    
    const userObj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.psw
    };

    res.json(userObj);

})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});