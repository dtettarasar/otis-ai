import axios from 'axios';
import backendConfig from './../backend.config';
import Cookies from 'js-cookie';

let backendUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   backendUrl = backendConfig.development;
} else {
   backendUrl = backendConfig.production;
}

export async function retrieveArticleData(articleId) {

    const retrieveArticleBackendUrl = backendUrl + 'front-api/retrieve-article-data';
    const accessToken = Cookies.get('accessToken');

    console.log('init retrieveArticleData function');
    console.log('articleId: ');
    console.log(articleId);
    console.log(typeof articleId);

    try {

        const response = await axios.get(retrieveArticleBackendUrl, {
            params: {
                articleId: articleId,
                accessToken: accessToken
            }
        });

        console.log("response data:");
        console.log(response.data);

    } catch (err) {

        console.error(err);

    }

};