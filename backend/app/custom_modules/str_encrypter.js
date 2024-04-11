const crypto = require('crypto');

const strEncrypter = {

    secretKey: 'MaSuperCleSecrete',

    encryptString: async function (strToEncrypt) {

        console.log('init encryptString method');

        try {

            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.secretKey), iv);
            let encrypted = cipher.update(strToEncrypt, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return { iv: iv.toString('hex'), encryptedData: encrypted }; 

        } catch (err) {

            console.error(err);
            return false;

        }

    },

    decryptString: async function (strToDecrypt, iv) {

        console.log('init decryptString method');

        try {

            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.secretKey), Buffer.from(iv, 'hex'));
            let decrypted = decipher.update(strToDecrypt, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;

        } catch (err) {
            
            console.error(err);
            return false;
            
        }

    }

}

exports.method = strEncrypter;