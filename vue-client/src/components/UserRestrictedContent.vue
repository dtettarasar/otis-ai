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
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'UserRestrictedContent',

        data() {

            return {
                loginStatus: null
            }

        },

        

        computed: {

            ...mapState(['username', 'userLoggedIn', 'userInitialInfoSaved']),

            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            }

        },

        mounted() {
            this.fetchData();
        },

        methods: {

            ...mapActions(['saveUsername', 'updateUserLoggedIn', 'saveUserInfo']),

            fetchData() {

                console.log('init fetch data');

                console.log('check in the store the existing values:');

                console.log('username: ' + this.username);
                console.log('userLoggedIn: ' + this.userLoggedIn);

                // get the data from the user token
                axiosInstance.get(this.loginBackEndUrl)
                    .then(response => {

                        console.log('response.data');
                        console.log(response.data);
                        this.loginStatus = response.data.status;

                        if (this.loginStatus && !this.userInitialInfoSaved) {
                            // Save the intial user info in the vuex store
                            this.saveUserInfo();  
                        } 

                        /*
                        - Track the login status
                        - this.loginStatus correspond to the values we get from the backend, based on the token's validity
                        - this.userLoggedIn is used to track the login in the vuex store to manipulate vue components
                        */
                        if (this.loginStatus !== this.userLoggedIn) {

                            this.updateUserLoggedIn(this.loginStatus);

                        }


                    })
                    .catch(error => {
                        console.error(error);
                    });
            
            }

        }
    }

</script>
