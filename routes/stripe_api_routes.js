/*
Documentation: 
https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout
https://stripe.com/docs/checkout/quickstart
https://stripe.com/docs/webhooks/quickstart?lang=node
*/

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const userTokenClass = require('../app/custom_modules/user_token_class');
const userToken = new userTokenClass();

const dataBaseClass = require('../app/config/db.config');
const dataBase = new dataBaseClass();
dataBase.initDB();

// get the secret here: https://dashboard.stripe.com/webhooks
const stripeEndpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const PORT = process.env.PORT || 8080;

// page links required by Stripe for the checkout sessions
const successUrl = `https://${process.env.WEBSITE_DOMAIN}/payment-api/success`;
const cancelUrl = `https://${process.env.WEBSITE_DOMAIN}/payment-api/cancel`;

router.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

router.post('/webhook', async (request, response) => {

    console.log('start webhook route -------------------------------');

    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.rawBody, sig, stripeEndpointSecret);
        //console.log(event);
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

        case 'payment_intent.payment_failed':
            const paymentIntentFail = event.data.object;
            console.log(`Error: PaymentIntent for ${paymentIntentFail.amount} has failed.`);
            break;
        
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        
        case 'payment_intent.requires_action':
            const paymentActionRequired = event.data.object;
            break;
        
        case 'charge.succeeded':
            const chargeSuccess = event.data.object;
            console.log('Charge succeeded');
            break;
        
        case 'checkout.session.completed':
            const checkoutData = event.data.object;
            console.log("checkout session complete");
            // TODO : create the order object here + update credit balance here.
            // In the order object store the 2 following datas:
            console.log('checkout data');
            console.log(checkoutData)
            console.log('----');
            console.log("event id");
            console.log(event.id);
            console.log('----');
            console.log('checkout session ID');
            console.log(event.data.object.id);
            break;

        case 'charge.failed':
            const chargeFail = event.data.object;
            console.log('Error: Charge failed');
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);

    }

    console.log('end webhook route -------------------------------');

    // Renvoie une réponse 200 pour confirmer la réception de l'événement
    response.send();
});

router.post('/create-checkout-session', userToken.authToken, async(req, res) => {

    console.log('start checkout session route -------------------------------');

    

    const tokenData = {
        Success: true,
        accessToken: req.signedCookies.token,
        refreshToken: req.signedCookies.refreshToken,
        user: req.user
    }

    const userInfo = {
        userId: req.user['_id'],
        username: await dataBase.getUserName(req.user['_id']),
        credit: await dataBase.getUserCrd(req.user['_id'])
    };

    console.log(userInfo);

    const customer = await stripe.customers.create({
        description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
        metadata:{
            otisUserId: userInfo.userId
        }
    });

    console.log("customer data");
    console.log(customer);

    const crdQuantity = req.body.quantity;

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
        customer: customer.id,
        success_url: successUrl,
        cancel_url: cancelUrl

    });

    console.log('session data');
    console.log(session);

    console.log('end checkout session route -------------------------------');

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
