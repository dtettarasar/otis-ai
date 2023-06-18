import { Configuration, OpenAIApi } from "openai";
import * as fs from 'fs';


let rawdata = fs.readFileSync('configuration_files/config01.json');
console.log(rawdata);
let configData = JSON.parse(rawdata);
console.log(configData);


/*
const openai = new OpenAIApi(configuration);
*/

/*
const chatCompletion = await openai.createChatCompletion({
    model:"gpt-3.5-turbo",
    messages: [
        {role: "user", content: "bonjour!"},
    ]
});
*/

// exemple de requête : écris moi un article de 600 mots sur la data fabric, au format markdown

//console.log(chatCompletion.data.choices[0].message);


/*
try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
*/