const bcrypt = require("bcryptjs");
const password = "mypass123";
const passwordHash = "$2a$10$8xPneLBVQajfh4HaDCsmfeRd11vv9t8xCBt1ICcql6CYIkkKu/INy";
const passwordWrongHash = "$2a$10$jPOp0sr7w.eWVS5yLjR3KO6cMYnA7zJHnAMBapOKMW4b4eoCdbyvS";
const saltRounds = 10;

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

    },

    checkHash: (strToCheck, hashToCheck) => {

        bcrypt.compare(strToCheck, hashToCheck, (err, isMatch) => {

            if (err) {
                throw err;
              } else if (!isMatch) {
                console.log("Password doesn't match!");
              } else {
                console.log("Password matches!");
              }

        })

    }

}


strHasher.getHash(password);
strHasher.checkHash(password, passwordHash);

//console.log(hashed);


exports.config = strHasher;