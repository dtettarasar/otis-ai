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

    const articleData = {
        id: articleId,
        title: null, 
        description: null,
        content: null,
        creationDate: null,
        lastModifDate: null,
        errorMessages: null
    };

    try {

        const response = await axios.get(retrieveArticleBackendUrl, {
            params: {
                articleId: articleId,
                accessToken: accessToken
            }
        });

        articleData.title = response.data.articleTitle;
        articleData.description = response.data.articleDesc;
        articleData.content = response.data.articleMd;
        articleData.creationDate = response.data.articleCreationDate;
        articleData.lastModifDate = response.data.articleLastModifiedDate;
        

    } catch (err) {

        articleData.errorMessages = err;

    }

    return articleData;

};