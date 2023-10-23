/*
Documentation: 
https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout
https://stripe.com/docs/checkout/quickstart
*/

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const PORT = process.env.PORT || 8080;

//const YOUR_DOMAIN = `http://localhost:${PORT}`;


router.post('/create-checkout-session', async(req, res) => {

    const crdQuantity = req.body.quantity;

    /* build the address for the success url and cancel url */
    const urlHost = req.headers['x-forwarded-host'];
    const urlProto = req.headers['x-forwarded-proto'];
    const address = `${urlProto}://${urlHost}`;

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
                quantity: crdQuantity
            }
        ],
        mode: 'payment',
        success_url: `${address}/payment-checkout/success`,
        cancel_url: `${address}/payment-checkout/cancel`

    });

    res.redirect(303, session.url);
})

router.get('/success', (req, res) => {
    res.render('payment/success');
})

router.get('/cancel', (req, res) => {
    res.render('payment/cancel');
})

module.exports = router;
