import { Configuration, OpenAIApi } from "openai";
import * as fs from 'fs';

let rawdata = fs.readFileSync('configuration_files/config.json');
let configData = JSON.parse(rawdata);
console.log(configData);

const configuration = new Configuration({
    "organization": configData.organization,
    "apiKey": configData.apiKey
});

const openai = new OpenAIApi(configuration);

const chatCompletion = await openai.createChatCompletion({
    model:"gpt-3.5-turbo",
    messages: [
        {role: "user", content: "hello world"},
    ]
});


// exemple de requête : écris moi un article de 600 mots sur la data fabric, au format markdown

console.log(chatCompletion.data.choices[0].message);

// Build 2 functions
// Generate article from a topics (string)
// Generate article from an array of keywords