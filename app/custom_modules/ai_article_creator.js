const OpenAI = require("openai");
const env = require('dotenv').config();

const aiArticleCreator = {

    openAIApiData : {
        organization: process.env.OPEN_AI_ORG,
        apiKey: process.env.OPEN_AI_KEY
    },

    generatePrompt(keywords, chosenLanguage) {

        const language = {
            fr: 'french',
            en: 'english',
            es: 'spanish'
        };

        const textRequest = `write an article optimized for search engine. to define the topics of the article and the lexical field, use the following keywords: ${keywords}. 
        it should be written in markdown format. the language of the article should be ${language[chosenLanguage]}.
        the article should contain subtitles for each section. at the end of the article, add a section in which you mention the sources used to create the article.
        Make sure the sources you're using are pages that are available on the web, and not fake or dead links`;

        return textRequest;

    },

    initApiConfig() {

        const openai = new OpenAI(configData);
        return openai;

    },

    async generateArticle(prompt) {
        
        const openai = await new OpenAI(this.openAIApiData);

        if (openai) {

            try {

                const chatCompletion = await openai.chat.completions.create({
                    messages: [{ role: 'user', content: prompt }],
                    model: 'gpt-3.5-turbo',
                  });
    
                return chatCompletion.choices;

            } catch(err) {

                console.log(err);

            }

        } else {

            return false;

        }

    }

}

module.exports = aiArticleCreator

//TODO
//convert API response to markdown file
//Error handler for confidguration process 
//Error handler for API call
//improve the prompt to test sources mentionned in the article (make sure the links doesn't points to pages or content that don't exist)

