# otis-ai
Otis AI: Your Digital SEO Scribe! 

## Connect your Database first
create a .env file and store in it the connection string, using the variable name "DB_URL"

~~~
DB_URL="mongodb+srv://<username>:<password>@<clustername>.0a0a0a0.mongodb.net/otis-ai?retryWrites=true&w=majority"
~~~

## Connect your Open AI account
In the .env file, add the required variables to build the connection with your Open AI account

~~~
OPEN_AI_ORG='org-6Z*********************m'
OPEN_AI_KEY='sk-ty********************************************cp'
~~~

## Add the Stripe API Key to handle payments: 
In the .env file, add the Stripe secret API key to handle payments

~~~
STRIPE_KEY='sk_51********************************************************************************************ps'
~~~

## Generate the required secrets 
use the command npm run get-secrets in the terminal, to get the required secrets for the JSON web tokens.
