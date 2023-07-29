require('dotenv').config()
const mongoose = require('mongoose');

const databaseObj = {

    initDB: async () => {

        try {
            const connect = await mongoose.connect(process.env.DB_URL);
            console.log("Successfully connect to MongoDB.");
        } catch (err) {
            console.error("Connection error", err);
            process.exit();
        }
    }

}

exports.config = databaseObj;
