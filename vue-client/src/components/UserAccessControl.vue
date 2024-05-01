<template>

    <div v-if="this.loginRequired === true && this.loginStatus === false">
        
        <p>You must be logged in to access this page</p>

        <!-- Pour les composants 'page main containers' faire en sorte que l'on pass un props bool 'login required'. -->
        <!-- Et utiliser le composant UserRestricted Content sur chaque view, cela permettra de pouvoir afficher la pop up d'alerte de fin de session sur les pages publiques si besoin, pour les utilisateurs connectés -->
        <!-- Ou sinon créer un composant à part pour gérer la pop up, que l'on pourra utiliser sur toutes les pages -->
    </div>

    <div v-else-if="this.loginRequired === true && this.loginStatus === true || this.loginRequired === false">
        <slot></slot>

    </div>

    <div v-if="this.getCookieExpTimestamp" >
        <SessionExpirationModal></SessionExpirationModal>
    </div>

</template>

<script>

    import axios from 'axios';
    import { mapActions, mapState, mapGetters } from 'vuex';
    
    import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';
    import SessionExpirationModal from '@/components/modals/SessionExpirationModal.vue';



    export default {

        name: 'UserAccessControl',

        props: {
            loginRequired: {
                type: Boolean,
                required: true
            }
        },

        components: {
            SessionExpirationModal
        },

        data() {

            return {
                loginStatus: null,
                expTimestamp: null,
                countdownInterval: null
            }

        },

        computed: {

            ...mapState(['username', 'credit', 'userLoggedIn', 'userInitialInfoSaved']),

            ...mapGetters(['getCookieExpTimestamp']),

            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            },

            getUserDataUrl() {
                return this.$backendUrl + 'front-api/user-datas';
            }

        },

        async mounted() {
            
            await this.fetchData();
            //console.log('cookieExpTimestamp from getter (UserRestrictedContent component):', this.getCookieExpTimestamp);

        },

        beforeCreate() {
            
        },

        methods: {

            ...mapActions(['updateUserLoggedIn', 'saveUserInfo', 'saveCookieExpTimestamp']),

            async fetchData() {

                console.log('init fetch data');

                /*
                console.log('check in the store the existing values:');
                console.log('username: ' + this.username);
                console.log('userLoggedIn: ' + this.userLoggedIn);
                */

                // get the data from the user token
                await axiosInstance.get(this.loginBackEndUrl)
                    .then(response => {

                        
                        console.log('response.data');
                        console.log(response.data);

                        //this.expTimestamp = response.data.result.exp;

                        this.loginStatus = response.data.status;

                        if (this.loginStatus && !this.userInitialInfoSaved) {

                            // Save the intial user info in the vuex store
                            this.getUserInitialData(response.data.result.userIdEncryption);
                            this.saveCookieExpTimestamp(response.data.result.exp);

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

            async getUserInitialData(userIdObj) {

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

                //console.log('init getUserInitialData method');

                //console.log('backend route to call: ' + this.getUserDataUrl);

                //console.log(userIdObj);

                const reqData = {
                    userId: userIdObj
                };

                const userDataObj = {
                    username: null,
                    credit: 0
                }

                await axios.get(this.getUserDataUrl, {
                    params: reqData
                })
                .then(res => {

                    //console.log('Response from backend:', res.data);

                    userDataObj.username = res.data.username;
                    userDataObj.credit = res.data.credit;

                    //console.log('userDataObj from component method');
                    //console.log(userDataObj);

                })
                .catch(err => {

                    console.error('Error fetching user data:', err);

                });

                this.saveUserInfo(userDataObj);

            },

        }
    }

</script>
