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
    import Cookies from 'js-cookie';
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

            userAuthBackEndUrl() {
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

            ...mapActions(['updateUserLoggedIn', 'saveUserInfo', 'saveCookieExpTimestamp', 'saveArticleIds']),

            async fetchData() {

                // console.log('init fetch data');

                const accessToken = Cookies.get('accessToken');
                // console.log("accessToken in fetch data: " + accessToken);

                // Création d'une instance Axios avec le token actuel
                const axiosWithAuth = axiosInstance(accessToken);

                try {

                    const response = await axiosWithAuth.get(this.userAuthBackEndUrl);
                    
                    // console.log('response.data');
                    // console.log(response.data);

                    this.loginStatus = response.data.status;

                    if (this.loginStatus && !this.userInitialInfoSaved) {

                        this.getUserInitialData(response.data.result.userIdEncryption);
                        this.saveCookieExpTimestamp(response.data.result.exp);

                        this.getUserArticlesIds(response.data.result.userIdEncryption);

                    }

                    if (this.loginStatus !== this.userLoggedIn) {

                        this.updateUserLoggedIn(this.loginStatus);
                        
                    }

                } catch(err) {

                    console.error(err);

                }
            
            },

            async getUserArticlesIds(userIdObj) {

                const testArticleIds = [
                    'id123456789',
                    'id789456123',
                    'id456789123'
                ]

                console.log('init getUserArticlesIds');
                console.log('userIdObj');
                console.log(userIdObj);

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

                    this.saveUserInfo(userDataObj);

                })
                .catch(err => {

                    console.error('Error fetching user data:', err);

                });

            },

        }
    }

</script>
