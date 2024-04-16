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
import axios from 'axios';
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
            },

            getUserDataUrl() {
                return this.$backendUrl + 'front-api/user-datas';
            }

        },

        mounted() {
            this.fetchData();
        },

        methods: {

            ...mapActions(['updateUserLoggedIn', 'saveUserInfo']),

            fetchData() {

                console.log('init fetch data');

                /*
                console.log('check in the store the existing values:');
                console.log('username: ' + this.username);
                console.log('userLoggedIn: ' + this.userLoggedIn);
                */

                // get the data from the user token
                axiosInstance.get(this.loginBackEndUrl)
                    .then(response => {

                        /*
                        console.log('response.data');
                        console.log(response.data);
                        */

                        this.loginStatus = response.data.status;

                        if (this.loginStatus && !this.userInitialInfoSaved) {

                            // Save the intial user info in the vuex store
                            this.getUserInitialData(response.data.result.userIdEncryption);

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
            
            },

            getUserInitialData(userIdObj) {

                //Méthode qui va récupérer les infos initiales de l'utilisateur après la connexion à son compte 
                /*
                    Prendre en paramètre le user id crypté issu du token
                    Faire une requête axios vers le backend en envoyant l'id crypté
                    
                    le backend récupère l'id le décrypte puis fais les requête vers mongodb pour récupérer les infos de la database. 
                    Le backend renvoie ensuite les infos à cette méthode. 

                    Item à récupérer depuis le backend après le login process: 
                    - username
                    - nb de credit
                    - liste des articles existants (charger les ids)
                     
                    on appelle la fonction saveUserInfo() pour que le store de vuex sauvegarde les infos.

                */

                console.log('init getUserInitialData method');

                //console.log('backend route to call: ' + this.getUserDataUrl);

                console.log(userIdObj);

                const reqData = {
                    userId: userIdObj
                };

                axios.get(this.getUserDataUrl, {
                    params: reqData
                })
                .then(res => {

                    console.log('Response from backend:', res.data);

                })
                .catch(err => {

                    console.error('Error fetching user data:', err);

                });

                const userDataObj = {
                    username: null,
                    credit: null
                }

                this.saveUserInfo(userDataObj);

            }

        }
    }

</script>
