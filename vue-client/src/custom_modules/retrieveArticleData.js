import axios from 'axios';
import backendConfig from './../backend.config';

let backendUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   backendUrl = backendConfig.development;
} else {
   backendUrl = backendConfig.production;
}

export async function retrieveArticleData(articleId) {

    console.log('init retrieveArticleData function');
    console.log('articleId: ' + articleId);

};