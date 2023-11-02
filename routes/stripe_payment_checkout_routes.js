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

router.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

router.post('/webhook', (request, response) => {

    console.log('start webhook route -------------------------------');

    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, stripeEndpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle all Stripe event
    switch (event.type) {

        case 'payment_intent.succeeded':
            const paymentIntentSuccess = event.data.object;
            console.log(`PaymentIntent for ${paymentIntentSuccess.amount} was successful!`);
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;

        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            console.log(`PaymentIntent for ${paymentIntentCreated.amount} is created`);
            break;
        
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        
        case 'charge.succeeded':
            const chargeData = event.data.object;
            console.log('Charge succeeded');
            break;
        
        case 'checkout.session.completed':
            const checkoutData = event.data.object;
            console.log("checkout session complete");
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);

    }

    console.log('end webhook route -------------------------------');

    // Renvoie une réponse 200 pour confirmer la réception de l'événement
    response.send();
});

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
        success_url: `${address}/payment-api/success`,
        cancel_url: `${address}/payment-api/cancel`

    });

    res.redirect(303, session.url);
})

function addRawBody(req, res, next) {
    req.setEncoding('utf8');
  
    var data = '';
  
    req.on('data', function(chunk) {
      data += chunk;
    });
  
    req.on('end', function() {
      req.rawBody = data;
  
      next();
    });
}

router.get('/webhook', (req, res) => {
    console.log(stripeEndpointSecret);
    res.json({
        endpoint: 'test'
    })
} )

router.get('/success', (req, res) => {
    res.render('payment/success');
})

router.get('/cancel', (req, res) => {
    res.render('payment/cancel');
})

module.exports = router;
