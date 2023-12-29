//Packages
const env = require('dotenv').config();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const {marked} = require("marked");
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

//Models
const roleModel = require('../models/role.model');
const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');
const ArticleModel = require('../models/article.model');

const dataBaseObj = {

    dbUrl: process.env.DB_URL,

    async initDB() {

        try {
            const connect = await mongoose.connect(this.dbUrl);
            console.log("DataBase Object: Successfully connect to MongoDB.");
        } catch (err) {
            console.error("DataBase Object: Connection error", err);
            process.exit();
        }
        

    },

    async findUserById(userId) {

        const query = UserModel.findById(userId);
        const userFound = await query.exec();

        return userFound;

    },

    async updateCreditBalance(userId, creditAmount) {

        console.log("Database Obj: init removeCredit method");

        const user = await this.findUserById(userId);

        console.log(user);
        console.log(creditAmount);

        const newBalance = user.credit + creditAmount;

        if (!user) {

            throw new NotFoundError();

        } else {

            user.set({ credit: newBalance });
            await user.save();

        }

    },

    async createArticle(titleStr, descriptionStr, markdownStr, otisUserIdStr) {

        /*
            todo: 
            add process to check and update user credit here
        */

        console.log("Database Obj: init create article method");

        let articleObj = new ArticleModel({
            title: titleStr,
            description: descriptionStr,
            markdown: markdownStr,
            otisUserId: otisUserIdStr
        });

        try {

            articleObj = await articleObj.save();

            return articleObj

        } catch(err) {

            console.log(err);
            console.log("article value here");
            console.log(articleObj);
            
            return false;

        }

    }

}

module.exports = dataBaseObj;