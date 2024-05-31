const stripe = require('stripe')(process.env.STRIPE_KEY);
const dataBaseObj = require('./database_obj');
const clientUrl = process.env.VUE_CLIENT_SERVER;

const stripeApiObj = {

    async createCheckoutSession(userId, creditQuantity) {

        const sessionObj = {
            creationStatus: null,
            stripeResponse: null
        }

        /*
            Récupérer le user ID et la quantité de crédit acheté en paramètre de la méthode. 
            Vérifier que le user id est valide et qu'il correspond bien à un compte d'utilisateur présent dans mongodb
            Avec le user ID : récupérer ou créer le stripe customer account et récupérer le customer id. 
            Construire les liens des pages de success ou de cancel de payment

            Avec tous ces éléments construire la checkout session, récupérer la session url la renvoyer au vue client
            pour que le vue client redirige l'utilisateur vers la page de paiement stripe

        */

        console.log('stripe api: init create checkout session method');
        console.log('userId: ' + userId);
        console.log('creditQuantity: ' + creditQuantity);

        let customer = await dataBaseObj.createStripeCustomerObj(userId);

        console.log('customer data from stripe: ');
        console.log(customer);

        console.log('session creation: ');

        try {

            sessionObj.stripeResponse = await stripe.checkout.sessions.create({

                line_items: [
                    {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name:'Otis-Credit'
                            },
                            unit_amount: 100
                        },
                        quantity: creditQuantity
                    }
                ],
                mode: 'payment',
                customer: customer.id,
                success_url: `${clientUrl}/sucess-payment`,
                cancel_url: `${clientUrl}/cancel-payment`
        
            });

            sessionObj.creationStatus = true;
    
            //console.log(sessionObj);

        } catch (err) {

            //console.log(err);
            sessionObj.creationStatus = false;
            sessionObj.error = err;

        }

        console.log('------------ End of createCheckoutSession method ------------');

        return sessionObj;

    }

}

module.exports = stripeApiObj;