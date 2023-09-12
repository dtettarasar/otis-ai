const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user_routes');

const app = express();
require('dotenv').config();

const cookies = require("cookie-parser");
//TODO : replace cookies secret by a .env variable
app.use(cookies('yourSecretGoesHere')); 

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

app.use('/user', userRouter);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});