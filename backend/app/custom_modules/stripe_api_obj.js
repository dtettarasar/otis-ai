const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeApiObj = {

    async createCheckoutSession() {

        console.log('stripe api: init create checkout session method');

    }

}

module.exports = stripeApiObj;