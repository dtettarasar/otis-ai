const bcrypt = require("bcryptjs");
const password = "mypass123";
const passwordHash = "$2a$10$bUR/.yETRC3kdT1xOUyBNuJCpwtYwsPLLHrsqfWcTQtRzJutL17Qq";

const strHasher = {

    genHashedStr: async (strToHash) => {

        try {

            const salt = await bcrypt.genSalt();
            const hashedStr = await bcrypt.hash(strToHash, salt);
            return hashedStr;

        } catch (err) {

            console.log(err);
            return false;

        }

    },

    checkHash: async (strToCheck, hashToCheck) => {

        try {

            const testStr = await bcrypt.compare(strToCheck, hashToCheck);

            if (testStr) {

                console.log("Password matches!");
                return true;

            } else {

                console.log("Password doesn't match!");
                return false;

            }

        } catch (err) {

            console.log(err); 
            return false;

        }

    }

}

const testHash = async () => {

    const result = await strHasher.genHashedStr(password);
    console.log(result);

}

const testHashChecker = async () => {

    const result = await strHasher.checkHash(password, passwordHash);
    console.log(result);

}

//testHash();
//testHashChecker();

exports.config = strHasher;