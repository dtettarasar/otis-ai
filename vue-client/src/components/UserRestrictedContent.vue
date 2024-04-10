<template>

    <div v-if="!this.loginStatus">
        You must be logged in to access this page
    </div>

    <div v-else>
        <slot></slot>
    </div>

</template>

<script>

    import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';
    import { mapActions } from 'vuex';

    export default {
        name: 'UserRestrictedContent',

        data() {

            return {
                loginStatus: null
            }

        },

        computed: {
            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            }
        },

        mounted() {
            this.fetchData();
        },

        methods: {

            ...mapActions(['saveUsername', 'updateUserLoggedIn']),

            fetchData() {

                console.log('init fetch data');

                // get the data from the user token
                axiosInstance.get(this.loginBackEndUrl)
                    .then(response => {

                        console.log('response.data');
                        console.log(response.data);
                        this.loginStatus = response.data.status;

                        if (this.loginStatus) {
                            // Save the username in the vuex store
                            this.saveUsername(response.data.result.username);
                        }

                        // Track the user Logged In in the store
                        this.updateUserLoggedIn(this.loginStatus);

                        // Si loginStatus est égal à false, supprimer les tokens du navigateur

                    })
                    .catch(error => {
                        console.error(error);
                    });
            
            }

        }
    }

</script>