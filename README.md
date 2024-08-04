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

### Define the expiration time for the JSON web tokens 

~~~
ACCESS_TOKEN_EXP='2m'
REFRESH_TOKEN_EXP='4h'
~~~

## Vue client parameters

### Add the link of the vue client in the .env file 
In the .env file, add the link of the Vue client, to make sure the backend app can interact with the client. 

~~~
VUE_CLIENT_SERVER="http://localhost:5173"
~~~

### Build the file for the connection with the backend API

build the file 'vue-client/src/backend.config.js' and make sure it follows the structure below: 

~~~
const backendConfig = {
    development: 'http://127.0.0.1/',
    production: 'http://api.example.com'
};
  
export default backendConfig;
~~~

### Deployment Instructions for Traditional Servers

When deploying to a server that requires a traditional setup, follow these steps:

1. **Build the Vue.js Application**:
   Run the build command to generate the `dist` directory.
   ~~~
   npm run build
   ~~~

2. **Prepare the Directory Structure**:
   Ensure that the `dist` directory, `server.js`, and `package.json` are in the correct locations.

- Your project structure should look like this:
~~~
 /srv/data/web/vhosts/default/
 ├── dist/
 │   ├── index.html
 │   ├── assets/
 │   │   ├── fichier1.js
 │   │   ├── fichier2.css
 │   │   └── ...
 ├── server.js
 └── package.json
~~~

3. **Create or Update `server.js`**:

Ensure that `server.js` is configured to serve the static files from the `dist` directory.
    
~~~
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
~~~

4. **Create or Update package.json:**

Ensure that package.json includes the necessary dependencies and the start script.

~~~
{
    "name": "vue-static-server",
    "version": "1.0.0",
    "description": "Static server for Vue.js application",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "express": "^4.17.1"
    }
}
~~~

5. **Install Dependencies:**

Connect to your server via SSH and navigate to the directory containing server.js and package.json. Run the following command to install dependencies:

~~~
npm install
~~~

6. **Start the server**

Start the server using the appropriate method to ensure it runs in the background. For example:

~~~
nohup npm start &
~~~

Or use pm2 for process management:

~~~
pm2 start server.js
pm2 save
pm2 startup
~~~

By following these steps, you will ensure that your Vue.js application is correctly deployed and served by the Node.js backend.
