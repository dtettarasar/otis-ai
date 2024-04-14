const crypto = require('crypto');
//const env = require('dotenv').config({ path: '../.env' });

const strEncrypter = {

    secretKey: process.env.ENCRYPTION_KEY,

    encryptionAlgo: 'aes-256-cbc',

    encryptString: async function (strToEncrypt) {

        console.log('init encryptString method');
        console.log('secret key: ' + this.secretKey);

        try {

            const encryptionObj = {
                iv: crypto.randomBytes(16),
                encryptedStr: null
            }

            let cypher = crypto.createCipheriv(this.encryptionAlgo, this.secretKey, encryptionObj.iv);
            encryptionObj.encryptedStr = cypher.update(strToEncrypt, 'utf-8', 'hex');
            encryptionObj.encryptedStr += cypher.final('hex');

            this.decryptString(encryptionObj);

            return true;

        } catch (err) {

            console.error(err);
            return false;

        }

    },

    decryptString: async function (encryptionObj) {

        console.log('init decryptString method');

        console.log(encryptionObj);

        try {

            let decipher = crypto.createDecipheriv(this.encryptionAlgo, this.secretKey, encryptionObj.iv);
            let decrypted = decipher.update(encryptionObj.encryptedStr, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            console.log('decrypted: ' + decrypted);

        } catch (err) {
            
            console.error(err);
            return false;
            
        }

    }

}

exports.method = strEncrypter;