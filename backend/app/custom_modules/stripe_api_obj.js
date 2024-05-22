const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeApiObj = {

    async createCheckoutSession() {

        console.log('stripe api: init create checkout session method');
        //console.log(stripe);

        /*
            Récupérer le token et la quantité de crédit acheté en paramètre de la méthode. 
            Authentifier le token + décrypter le user id
            Vérifier que le user id est valide et qu'il correspond bien à un compte d'utilisateur présent dans mongodb
            Avec le user ID : récupérer ou créer le stripe customer account et récupérer le customer id. 
            Construire les liens des pages de success ou de cancel de payment

            Avec tous ces éléments construire la checkout session, récupérer la session url la renvoyer au vue client
            pour que le vue client redirige l'utilisateur vers la page de paiement stripe

        */

    }

}

module.exports = stripeApiObj;