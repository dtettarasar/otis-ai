import { Configuration, OpenAIApi } from "openai";
import * as fs from 'fs';

let rawdata = fs.readFileSync('configuration_files/config.json');
let configData = JSON.parse(rawdata);
console.log(configData);

const configuration = new Configuration(configData);

const openai = new OpenAIApi(configuration);

class Article {

    constructor(keywords, chosenLanguage) {

        this.keywords = [keywords];

        this.language = {
            fr: 'french',
            en: 'english',
            es: 'spanish'
        };

        this.textRequest = `write an article optimized for search engine. to define the topics of the article and the lexical field, use the following keywords: ${this.keywords}. 
        it should be written in markdown format. the language of the article should be ${this.language[chosenLanguage]}.
        the article should contain subtitles for each section. at the end of the article, add a section in which you mention the sources used to create the article.
        Make sure the sources you're adding are pages that exists`;

    }

    getTextRequest() {
        return this.textRequest;
    }

    async generateArticle() {

        const chatCompletion = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages: [
                {role: "user", content: this.getTextRequest()},
            ]
        });

        const openAiResponse = chatCompletion.data.choices[0].message

        console.log(openAiResponse);
    }

}

const articleObj = new Article(["data fabric", "ai", "environment issues", "ecology"], 'fr');
//console.log(articleObj);
//console.log(articleObj.getTextRequest());
articleObj.generateArticle();


//TODO
//convert API response to markdown file
//Error handler for confidguration process 
//Error handler for API call
//improve the prompt to test sources mentionned in the article (make sure the links doesn't points to pages or content that don't exist)

