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

    // methods for user object

    async createUser(username, email, password) {

        console.log("init create user method from databaseObj");

        console.log(`username: ${username}`);
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);

        // Check if username already exist in database
        const usernameInDB = await this.findUserByName(username);

        // Check if email already exist in database
        const emailInDB = await this.findUserByEmail(email);

        if (usernameInDB.length !== 0) {

            console.log("username already exist in database");
            console.log(`usernameInDB:`);
            console.log(usernameInDB);

            //res.json({Error: "username already used"});

        } else if (emailInDB.length !== 0) {

            console.log('email already exist in database');
            console.log(`emailInDB:`);
            console.log(emailInDB);

            //res.json({Error: "email already used"});

        }

        console.log("end of create user method in database object");
        console.log("-----------------");

    },

    async findUserById(userId) {

        const query = UserModel.findById(userId);
        const userFound = await query.exec();

        return userFound;

    },

    async findUserByName(userName) {

        const query = UserModel.find({username: userName});
        query.select('username');
        const userFound = await query.exec();

        return userFound;

    },

    async findUserByEmail(userEmail) {

        const query = UserModel.find({email: userEmail});
        query.select('email');
        const userFound = await query.exec();

        return userFound;

    },

    async updateCreditBalance(userId, creditAmount) {

        console.log("Database Obj: init updateCreditBalance method");

        const user = await this.findUserById(userId);

        /*
        console.log(user);
        console.log(creditAmount);
        */

        const newBalance = user.credit + creditAmount;

        if (!user) {

            throw new NotFoundError();

        } else {

            user.set({ credit: newBalance });
            await user.save();

        }

    },

    // methods for article object

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