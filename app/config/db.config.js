require('dotenv').config()
const mongoose = require('mongoose');

const databaseObj = {

    initDB: () => {
        mongoose.connect(process.env.DB_URL);
        console.log(mongoose);
    }

}

exports.config = databaseObj;
