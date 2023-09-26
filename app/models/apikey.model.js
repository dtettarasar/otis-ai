const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

ApiKeySch = new mongoose.Schema({
    keyName: {type: String, required: true},
    orgId: {type: String, required: true},
    secretKey: {type: String, required: true},
    active: { type: Boolean, default: false},
    primaryKey: { type: Boolean, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


/*
TODO :
- middleware to hash orgID & secretKey values
- method  to test if strings provided for orgID & secretkey are valid pattern, using regex
- method to test if a key is valid
*/

const ApiKey = mongoose.model(
    "ApiKey", ApiKeySch
);

module.exports = ApiKey;