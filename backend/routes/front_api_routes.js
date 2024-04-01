// handle api routes for the front end client

const express = require('express');
const router = express.Router();

router.post('/user-login', async (req, res) => {
    console.log('test post request /vc-login');
    console.log(req);
    res.json({
        test: 'test the login form vue component',
        username: req.body.username,
        password: req.body.password
    });
});

module.exports = router;