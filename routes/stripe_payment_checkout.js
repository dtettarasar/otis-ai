/*
Documentation: 
https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout
https://stripe.com/docs/checkout/quickstart
*/

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const PORT = process.env.PORT || 8080;

const YOUR_DOMAIN = `http://localhost:${PORT}`;


router.post('/create-checkout-session', async(req, res) => {


    const session = await stripe.checkout.sessions.create({

        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name:'Otis-Credit'
                    },
                    unit_amount: 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/payment-checkout/success`,
        cancel_url: `${YOUR_DOMAIN}/payment-checkout/cancel`

    });

    console.log(session);

    res.redirect(303, session.url);
})


module.exports = router;
