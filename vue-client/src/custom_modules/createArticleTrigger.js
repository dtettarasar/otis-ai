import axios from 'axios';
import backendConfig from './../backend.config';
import Cookies from 'js-cookie';

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

    } catch (err) {

        console.error(err);

    }

}