const env = require('dotenv').config();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const roleModel = require('../models/role.model');
const UserModel = require('../models/user.model');

class DataBase {

    constructor () {

        this.dbUrl = process.env.DB_URL;

    }

    async initDB() {

        try {
            const connect = await mongoose.connect(this.dbUrl);
            console.log("Successfully connect to MongoDB.");
        } catch (err) {
            console.error("Connection error", err);
            process.exit();
        }
        

    }

    async createUser(req, res) {

        const userObj = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.psw
        });

        // Check if username already exist in database
        const usernameInDB = await this.findUserByName(userObj.username);

        // Check if email already exist in database
        const emailInDB = await this.findUserByEmail(userObj.email);

        if (usernameInDB.length !== 0) {

            console.log("username already exist in database");
            console.log(usernameInDB);

            res.json({Error: "username already used"});

        }   else if (emailInDB.length !== 0) {

            console.log('email already exist in database');
            console.log(emailInDB);

            res.json({Error: "email already used"});

        } else {
            
            console.log("username & email doesn't exist in database");

            try {

                const user = await userObj.save();
                console.log(user);
                res.json(user);
                
            } catch (err) {
        
                console.log(err);
                res.json({Error: err});
        
            }

        }

    }

    async findUserByName(userName) {

        const query = UserModel.find({username: userName});
        query.select('username');
        const userFound = await query.exec();

        return userFound;

    }

    async findUserByEmail(userEmail) {

        const query = UserModel.find({email: userEmail});
        query.select('email');
        const userFound = await query.exec();

        return userFound;

    }

    async findUserById(userID) {

        const query = UserModel.findById(userID);
        const userFound = await query.exec();

        return userFound;

    }

    async getUserPsw(userID) {

        const query = UserModel.findById(userID);
        query.select('_id password');
        const userPsw = await query.exec();

        return userPsw;

    }

    async getUserCrd(userID) {

        const query = UserModel.findById(userID);
        query.select('_id credit');
        const result = await query.exec();

        return result.credit;

    }

    async getUserStripeId(userID) {

        const query = UserModel.findById(userID);
        query.select('_id stripeCustomerId');
        const result = await query.exec();

        return result.stripeCustomerId;

    }

    async createStripeCustomerObj(userID) {

        console.log("init createStripeCustomerObj method----------------");

        let customer = {};

        const stripeCustomerId = await this.getUserStripeId(userID);

        console.log("stripeCustomerId: " + stripeCustomerId);

        if (stripeCustomerId) {

            try {

                customer = await stripe.customers.retrieve(stripeCustomerId);
                console.log(customer);

            } catch (error) {

                console.log("error in createStripeCustomerObj method:");
                console.log(error);

            }

        }

        if (customer.deleted === true || !stripeCustomerId) {

            console.log("Stripe customer has been deleted or not created yet");

        }

        /*

        try {

            if (stripeCustomerId) {
                customer = await stripe.customers.retrieve(stripeCustomerId);
            }

            // TODO : Autres vérifications ou manipulations nécessaires avec l'objet customer

        } catch (error) {

            // Une erreur s'est produite lors de la récupération de l'objet customer

            if (error.code === 'resource_missing') {
                // L'objet customer n'existe pas dans Stripe, recréer un nouvel objet
                console.log("No Stripe customer associated to Otis User");

                customer = await stripe.customers.create({
                    metadata: {
                        otisUserId: userID
                    }
                });

                // Mettre à jour l'identifiant dans l'objet user
                let userToUpdate = await this.findUserById(userID);

                if (!userToUpdate) {
                    throw new NotFoundError();
                } else {
                    userToUpdate.set({ stripeCustomerId: customer.id });
                    await userToUpdate.save();
                }

            } else {
                // Gérer d'autres types d'erreurs Stripe ou effectuer d'autres actions nécessaires
                console.error('Erreur lors de la récupération de l\'objet customer :', error);
                // TODO : Gestion d'erreur supplémentaire
                throw error;
            }
        }

        */


        /*
        let customer = {};

        const stripeCustomerId = await this.getUserStripeId(userID);

        if (stripeCustomerId) {

            try {

                customer = await stripe.customers.retrieve(stripeCustomerId);
                return customer;

            } catch (err) {

                console.log(err);

            }

        }

            customer = await stripe.customers.create({

                metadata:{
                    otisUserId: userID
                }

            });
    
            let userToUpdate = await this.findUserById(userID);
    
            if (!userToUpdate) {

                throw new NotFoundError();

            } else {

                userToUpdate.set({stripeCustomerId: customer.id});
                await userToUpdate.save();

            }

        */

        
        console.log("end of createStripeCustomerObj method----------------");

        return customer;


    }

    async getUserName(userID) {

        const query = UserModel.findById(userID);
        query.select('_id username');
        const result = await query.exec();

        return result.username;

    }

}

module.exports = DataBase;
