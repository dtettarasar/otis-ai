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
            return connect;
        } catch (err) {
            console.error("DataBase Object: Connection error", err);
            throw err;
        }
        

    },

    // methods for user object

    async createUser(usernameParam, emailParam, passwordParam) {

        //regex to test the param validity:
        const validUsernameRegex = /^[a-zA-Z0-9]+$/;
        const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const validEmailRegex = /^[_A-Za-z0-9-]+(?:\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,})$/gm;

        const testUsername = validUsernameRegex.test(usernameParam);
        const testPassword = securePwdRegex.test(passwordParam);
        const testEmail = validEmailRegex.test(emailParam);
        //console.log('testEmail: ' + testEmail);

        if(!testUsername) {

            return {creationStatus: false, Error: "username not valid"};

        }

        if (!testPassword) {

            return {creationStatus: false, Error: "password not secure enough"};

        }

        if (!testEmail) {

            return {creationStatus: false, Error: "email format not valid"};

        }

        //console.log("init create user method from databaseObj");

        /*
        console.log(`username: ${usernameParam}`);
        console.log(`email: ${emailParam}`);
        console.log(`password: ${passwordParam}`);
        */

        // Check if username already exist in database
        const usernameInDB = await this.findUserByName(usernameParam);

        // Check if email already exist in database
        const emailInDB = await this.findUserByEmail(emailParam);

        if (usernameInDB.length !== 0) {

            /*
            console.log("username already exist in database");
            console.log(`usernameInDB:`);
            console.log(usernameInDB);
            */

            return {creationStatus: false, Error: "username already used"};

        } else if (emailInDB.length !== 0) {

            /*
            console.log('email already exist in database');
            console.log(`emailInDB:`);
            console.log(emailInDB);
            */

            return {creationStatus: false, Error: "email already used"};

        } else {

            /*
            console.log("username & email doesn't exist in database");
            console.log("we can create new user");
            */

            const userObj = new UserModel({
                username: usernameParam,
                email: emailParam,
                password: passwordParam
            });

            //console.log(userObj);

            try {

                const savedUserObj = await userObj.save();

                //console.log(savedUserObj);

                return {creationStatus: true, userData: savedUserObj};
                
            } catch (err) {
        
                console.log(err);
                //res.json({Error: err});
                return {Error: err};
        
            }

        }

    },

    async createStripeCustomerObj(userId) {

        let customer = {};

        // console.log('init createStripeCustomerObj method');

        const stripeCustomerId = await this.getUserStripeId(userId);
        // console.log('userId: ' + userId);
        // console.log("stripeCustomerId: " + stripeCustomerId);

        // Si l'utilisateur a un stripe user ID, récupérer les data du stripe user account
        if (stripeCustomerId) {

            try {

                customer = await stripe.customers.retrieve(stripeCustomerId);

                // console.log(customer);

            } catch (error) {

                console.log("error in createStripeCustomerObj method:");
                console.log(error);

            }

        }

        if (customer.deleted === true || !stripeCustomerId) {

            // console.log("Stripe customer has been deleted or not created yet");

            // Identifier le user pour lequel créer ou mettre à jour le stripe customer id
            let userToUpdate = await this.findUserById(userId);

            // console.log("user found");
            // console.log(userToUpdate); 

            if (!userToUpdate) {

                console.log('error: user not found');

            } else {

                // Créer un nouveau stripe customer 
                customer = await stripe.customers.create({
                    email: userToUpdate.email,
                    metadata: {
                        description: 'Otis Customer',
                        otisUserId: userId,
                        username: userToUpdate.username
                    },
                    name: `otis_ai_${userToUpdate.username}_${userId}` 
                });

                userToUpdate.set({ stripeCustomerId: customer.id });
                await userToUpdate.save();
            }

            // console.log('user to update after stripe user creation: ');
            // console.log(userToUpdate);

        }

        // console.log('customer data:');
        // console.log(customer);
        // console.log("end of createStripeCustomerObj method----------------");

        return customer;

    },

    async findUserById(userId) {

        const query = UserModel.findById(userId);
        const userFound = await query.exec();

        if (userFound) {
            return userFound;
        } else {
            return false;
        }

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

    async getUserCrd(userID) {

        const query = UserModel.findById(userID);
        query.select('_id credit');
        const result = await query.exec();

        return result.credit;

    },

    async getUserName(userID) {

        const query = UserModel.findById(userID);
        query.select('_id username');
        const result = await query.exec();

        return result.username;

    },

    async getUserPsw(userID) {

        const query = UserModel.findById(userID);
        query.select('_id password');
        const userPsw = await query.exec();

        return userPsw;

    },

    async getUserStripeId(userID) {

        const query = UserModel.findById(userID);
        query.select('_id stripeCustomerId');
        const result = await query.exec();

        if (result) {

            return result.stripeCustomerId;

        } else {

            return false;

        }

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