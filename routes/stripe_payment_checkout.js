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

    const product = await stripe.products.create({
        name:'Otis-Credit'
    });

    
    const price = await stripe.prices.create({
        
        product: product.id,
        unit_amount: 100,
        currency: 'eur',

    });
    

    res.json({
        domain:YOUR_DOMAIN,
        post: "create-checkout-session",
        stripeKey: process.env.STRIPE_KEY,
        productData: product,
        priceData: price
    })
})


module.exports = router;
