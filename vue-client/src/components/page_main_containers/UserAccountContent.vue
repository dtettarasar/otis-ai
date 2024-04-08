<template>

    <div v-if="!this.loginStatus">
        You must be logged in to access this page
    </div>

    
    <div v-else>
        <h2>Welcome {{this.username}}!</h2>
    </div>
    

</template>

<script>

import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';

    export default {
        name: 'UserAccountContent.vue',

        data() {

            return {
                username: '',
                loginStatus: null
            }

        },

        computed: {
            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            }
        },

        mounted() {
            console.log(`the login form component is now mounted.`);
        },

        beforeMount() {
            this.fetchData();
        },

        methods: {

            fetchData() {

            console.log('init fetch data');

            // get the data from the user token
            axiosInstance.get(this.loginBackEndUrl)
                .then(response => {

                    console.log('response.data');
                    console.log(response.data);
                    this.loginStatus = response.data.status;

                    //if the access token is valid then get the username

                    if (this.loginStatus) {

                        this.username = response.data.result.username;

                    }

                })
                .catch(error => {
                    console.error(error);
                });
            
            }

        }
    }

</script>