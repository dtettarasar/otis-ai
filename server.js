const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user_routes');
const stripePaymentRouter = require('./routes/stripe_api_routes');

const app = express();
require('dotenv').config();

const cookies = require("cookie-parser");
app.use(cookies(process.env.COOKIE_SIGNATURE_SECRET));

const corsOptions = {
    origin: "http://localhost:8081"
}

app.set('view engine', 'ejs');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// necessary condition to avoid using express.json in the stripe_payment route
app.use((req, res, next) => {
    if (req.originalUrl.includes('/user')) {
        express.json()(req, res, next);
    } else {
        next();
    }
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/user', userRouter);
app.use('/payment-api', stripePaymentRouter);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});