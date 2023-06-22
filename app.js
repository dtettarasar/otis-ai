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
        the article should contain subtitles for each section. at the end of the article, add a section in which you mention the sources used to create the article`;

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

        console.log(chatCompletion.data.choices[0].message);
    }

}

const articleObj = new Article(["datacenter", "ecology", "environmental issues"], 'fr');
//console.log(articleObj);
//console.log(articleObj.getTextRequest());
articleObj.generateArticle();


// Build 2 functions
// Generate article from a topics (string)
// Generate article from an array of keywords
