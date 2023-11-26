const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send('article route');
});

module.exports = router;