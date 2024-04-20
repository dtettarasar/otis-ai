# otis-ai
Otis AI: Your Digital SEO Scribe!

## Backend parameters 

### Connect your Database first
create a .env file at the root of the backend folder and store in it the connection string, using the variable name "DB_URL"

~~~
DB_URL="mongodb+srv://<username>:<password>@<clustername>.0a0a0a0.mongodb.net/otis-ai?retryWrites=true&w=majority"
~~~

### Connect your Open AI account
In the .env file, add the required variables to build the connection with your Open AI account

~~~
OPEN_AI_ORG='org-6Z*********************m'
OPEN_AI_KEY='sk-ty********************************************cp'
~~~

### Add the Stripe API Key to handle payments: 
In the .env file, add the Stripe secret API key to handle payments, & the endpoint secret to handle webhooks

~~~
STRIPE_KEY='sk_51********************************************************************************************ps'
STRIPE_ENDPOINT_SECRET="whsec_8mb**********************************************************79m"
~~~

### Generate the required secrets 
use the command npm run get-secrets in the terminal, to get the required secrets for the JSON web tokens.

## Vue client parameters

### Add the link of the vue client in the .env file 
In the .env file, add the link of the Vue client, to make sure the backend app can interact with the client. 

~~~
VUE_CLIENT_SERVER="http://localhost:5173/"
~~~


### Build the file for the connection with the backend API

build the file 'src/backend.config.js' and make sure it follows the structure below: 

~~~
const backendConfig = {
    development: 'http://127.0.0.1/',
    production: 'http://api.example.com'
};
  
export default backendConfig;
~~~


