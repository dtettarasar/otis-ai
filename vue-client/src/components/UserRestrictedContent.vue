<template>

    <div v-if="!this.loginStatus">
        You must be logged in to access this page
    </div>

    <div v-else>
        <slot></slot>
        <!-- Pour les composants 'page main containers' faire en sorte que l'on pass un props bool 'login required'. -->
        <!-- Et utiliser le composant UserRestricted Content sur chaque view, cela permettra de pouvoir afficher la pop up d'alerte de fin de session sur les pages publiques si besoin, pour les utilisateurs connectés -->
        <!-- Ou sinon créer un composant à part pour gérer la pop up, que l'on pourra utiliser sur toutes les pages -->
    </div>

    <a @click="triggerModal()">test trigger modal</a>

    <SessionExpirationModal></SessionExpirationModal>

</template>

<script>

    import { Modal } from 'bootstrap'
    import axios from 'axios';
    import { mapActions, mapState } from 'vuex';
    
    import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';
    import SessionExpirationModal from '@/components/modals/SessionExpirationModal.vue';



    export default {
        name: 'UserRestrictedContent',

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

            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-auth';
            },

            getUserDataUrl() {
                return this.$backendUrl + 'front-api/user-datas';
            }

        },

        async mounted() {
            
            await this.fetchData();
            this.calculateTokenExpiration();

        },

        methods: {

            ...mapActions(['updateUserLoggedIn', 'saveUserInfo']),

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

                        this.expTimestamp = response.data.result.exp;

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

            calculateTokenExpiration() {

                // Method a utiliser pour calculer le délai avant l'expiration du token pour afficher le modal
                // Modal qui permettra à l'utilisateur de se déconnecter ou de rester connecté (en utilisant le refresh token pour accéder un nouveau access token)

                console.log('init calculateTokenExpiration method');
                console.log('token expiration: ' + this.expTimestamp);

                // delai à ajouter avant l'expiration du token. Permet d'afficher le modal pendant un temps donné, avant l'expiration du token et la deconnexion automatique de l'utilisateur.
                const timeToModal = 30;

                const modalTimestamp = this.expTimestamp - timeToModal;

                // Calcul du temps restant en secondes
                const currentTime = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
                const timeRemaining = modalTimestamp - currentTime;
                console.log("timeRemaining: " + timeRemaining);

                if (timeRemaining <= 0) {

                    console.log('activate the modal!');
                    this.triggerModal();

                } else if (timeRemaining > 0 && !this.countdownInterval) {

                    // Si le temps restant est positif et que l'on n'a pas encore lancé le countdown, on le démarre
    
                    console.log("Modal à afficher dans " + timeRemaining + " secondes.");

                    this.countdownInterval = setInterval(() => {

                        const countdown = modalTimestamp - Math.floor(Date.now() / 1000);

                        console.log("Modal à afficher dans " + countdown + " secondes.");

                        if (countdown <= 0) {
                            clearInterval(this.countdownInterval);
                            this.countdownInterval = null;
                            console.log('activate the modal!');
                            this.triggerModal();
                        }

                    }, 1000); // Rafraîchit toutes les secondes

                    //console.log(currentTime);

                }

            },

            triggerModal() {

                console.log('init trigger modal')

                let myModal = new Modal(document.getElementById('session-expire'));
                myModal.show();

                // Todo : track the active modal in the vuex store
                /* 
                    
                    Utiliser le state activeModal dans le store pour tracker si la pop up est déjà active.
                    Car pour le moment à chaque fois qu'on change de page entre le moment oul'on est connecté
                    et le moment ou la pop up doit s'afficher la pop up se crée plusieurs fois dans le code. 

                */

            }

        }
    }

</script>
