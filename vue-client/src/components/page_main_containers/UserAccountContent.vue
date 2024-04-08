<template>

    <h2>Welcome Username!</h2>

</template>

<script>

import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';

    export default {
        name: 'UserAccountContent.vue',

        computed: {
            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            }
        },

        mounted() {
            console.log(`the login form component is now mounted.`);
            this.fetchData();
        },

        methods: {

            fetchData() {

            console.log('init fetch data');

            axiosInstance.get(this.loginBackEndUrl)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            
            }

        }
    }

</script>