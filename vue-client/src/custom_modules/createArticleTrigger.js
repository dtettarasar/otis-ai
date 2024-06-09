import axios from 'axios';
import backendConfig from './../backend.config';
import Cookies from 'js-cookie';

/*
TODO: 

Mettre à jour la fonction pour qu'elle prenne en paramètre les infos de l'article provenant du formulaire (titre, description, contenu)
Passer ces paramètres dans la requête pour que le backend puisse les sauvegarder dans la BDD
Une fois que la création a été faite et validé par le backend, ce dernier doit retourner l'id ecnrypté de l'article. 

Puis la fonction ici doit rediriger l'user vers view-article/:id

*/

let backendUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   backendUrl = backendConfig.development;
} else {
   backendUrl = backendConfig.production;
}

export async function createArticleTrigger() {

    const createArticleBackendUrl = backendUrl + 'front-api/user-create-article';
    const accessToken = Cookies.get('accessToken');

    console.log('init createArticleTrigger module');

    try {

        const response = await axios.post(createArticleBackendUrl, {
            accessToken: accessToken
        });

        console.log("response data:")
        console.log(response.data);

        window.location.href = `/create-article/${response.data.articleId}`;

    } catch (err) {

        console.error(err);

    }

}
