const bcrypt = require("bcryptjs");
//const password = "mypass123"
const saltRounds = 10

const strHasher = {

    getHash: (strToHash) => {

        bcrypt.genSalt(saltRounds, (saltErr, salt) => {

            if (saltErr) {
                throw saltErr;
            } else {
                bcrypt.hash(strToHash, salt, (hashErr, hash) => {
                    if (hashErr) {
                        throw hashErr;
                    } else {
                        console.log(hash);
                    }
                })
            }
    
        })

    }

}

/*
const hashed = strHasher.getHash(password);
console.log(hashed);
*/

exports.config = strHasher;

//console.log();