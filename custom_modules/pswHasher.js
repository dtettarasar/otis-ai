const bcrypt = require("bcryptjs");
const password = "mypass123"
const saltRounds = 10

const encryptPswd = (pswdToEncrypt) => {

    bcrypt.genSalt(saltRounds, (saltErr, salt) => {

        if (saltErr) {
            throw saltErr;
        } else {
            bcrypt.hash(pswdToEncrypt, salt, (hashErr, hash) => {
                if (hashErr) {
                    throw hashErr;
                } else {
                    console.log(hash);
                }
            })
        }

    })

}

encryptPswd(password);