# otis-ai
Otis AI: Your Digital SEO Scribe! 

## Connect your Database first
create a .env file and store in it the connection string, using the variable name "DB_URL"

~~~
DB_URL="mongodb+srv://<username>:<password>@<clustername>.0a0a0a0.mongodb.net/otis-ai?retryWrites=true&w=majority"
~~~

## Generate the required secrets 
use the command npm run get-secrets in the terminal, to get the required secrets for the JSON web tokens.
