const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

class Article {

    constructor(keywords, chosenLanguage, apiFileName) {

        this.keywords = [keywords];

        this.language = {
            fr: 'french',
            en: 'english',
            es: 'spanish'
        };

        this.apiFileLink = 'configuration_files/' + apiFileName;

        this.textRequest = `write an article optimized for search engine. to define the topics of the article and the lexical field, use the following keywords: ${this.keywords}. 
        it should be written in markdown format. the language of the article should be ${this.language[chosenLanguage]}.
        the article should contain subtitles for each section. at the end of the article, add a section in which you mention the sources used to create the article.
        Make sure the sources you're using are pages that are available on the web, and not fake or dead links`;

        this.generatedArticle = "";

    }

    initApiConfig() {

        let configData = null;

        try {

            let rawdata = fs.readFileSync(this.getApiFileLink());
            configData = JSON.parse(rawdata);
        
        } catch (error) {
        
            console.log(error);
            return false;
        
        }

        console.log(configData);
        const configuration = new Configuration(configData);
        const openai = new OpenAIApi(configuration);

        return openai;

    }

    getTextRequest() {
        return this.textRequest;
    }

    getApiFileLink() {
        return this.apiFileLink;
    }

    getGeneratedArticle() {
        return this.generatedArticle;
    }

    async generateArticle() {

        const openai = this.initApiConfig();

        if (openai) {

            const chatCompletion = await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages: [
                    {role: "user", content: this.getTextRequest()},
                ]
            });
    
            const openAiResponse = chatCompletion.data.choices[0].message

            this.generatedArticle = openAiResponse.content;

            console.log(this.getGeneratedArticle());

        } else {

            return false;

        }

    }

}

const articleObj = new Article(["data fabric", "ai", "environment issues", "ecology"], 'fr', 'config.json');
articleObj.generateArticle();
//console.log(articleObj.getGeneratedArticle());


//TODO
//convert API response to markdown file
//Error handler for confidguration process 
//Error handler for API call
//improve the prompt to test sources mentionned in the article (make sure the links doesn't points to pages or content that don't exist)

