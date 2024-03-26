import './assets/main.css';

import { createApp } from 'vue';


import App from './App.vue';
import router from './router';
//import store from './store'

import backendConfig from './backend.config';

const app = createApp(App);

let backendUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   backendUrl = backendConfig.development;
} else {
   backendUrl = backendConfig.production;
}

console.log(backendUrl);


app.use(router);
//app.use(store)

app.mount('#app');
