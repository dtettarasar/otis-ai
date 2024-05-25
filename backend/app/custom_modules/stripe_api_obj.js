const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeApiObj = {

    async createCheckoutSession(userId, creditQuantity) {

        console.log('stripe api: init create checkout session method');
        console.log('userId: ' + userId);
        console.log('creditQuantity: ' + creditQuantity);
        
        //console.log(stripe);

        /*
            Récupérer le user ID et la quantité de crédit acheté en paramètre de la méthode. 
            Vérifier que le user id est valide et qu'il correspond bien à un compte d'utilisateur présent dans mongodb
            Avec le user ID : récupérer ou créer le stripe customer account et récupérer le customer id. 
            Construire les liens des pages de success ou de cancel de payment

            Avec tous ces éléments construire la checkout session, récupérer la session url la renvoyer au vue client
            pour que le vue client redirige l'utilisateur vers la page de paiement stripe

        */

    }

}

module.exports = stripeApiObj;