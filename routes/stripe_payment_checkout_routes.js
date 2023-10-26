/*
Documentation: 
https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout
https://stripe.com/docs/checkout/quickstart
https://stripe.com/docs/webhooks/quickstart?lang=node
*/

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// get the secret here: https://dashboard.stripe.com/webhooks
const stripeEndpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const PORT = process.env.PORT || 8080;

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

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {   

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse

    let event = req.body;

    if (stripeEndpointSecret) {

        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];

        try {

            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );


        } catch (err) {

            console.log(`Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);

        }

    }

    // Handle event
    switch (event.type) {

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);

    }

    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);

})

router.get('/success', (req, res) => {
    res.render('payment/success');
})

router.get('/cancel', (req, res) => {
    res.render('payment/cancel');
})

module.exports = router;
