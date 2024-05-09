<template>

    <!-- Modal -->
    <div class="modal fade" id="session-expire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Session expire warning</h1>
                </div>
                <div class="modal-body">
                    <p>For security, your session will expire in 30 seconds.</p>
                    <p>Do you want to extend the session?</p>
                </div>
                <div class="modal-footer">
                    <button v-on:click="refreshToken" type="button" class="btn btn-secondary">Extend my session</button>
                    <button v-on:click="logout" type="button" class="btn btn-primary">Log Out</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { Modal } from 'bootstrap';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import Cookies from 'js-cookie';

    import { initLogout } from '@/custom_modules/logoutSession';
    import { axiosInstance } from '@/custom_modules/createAxiosInstance.js';

    export default {
        
        name: 'SessionExpirationModal',

        data() {
            
            return {
                countdownInterval: null,
                delayToDispModal: 30,
                modalTriggered: false
            }

        },

        computed: {

            ...mapState(['activeModal', 'userLoggedIn']),

            ...mapGetters(['getCookieExpTimestamp', 'getSessionCountdownTriggered']),

            timeBeforeModalDisplay() {
                return this.getCookieExpTimestamp - this.delayToDispModal - this.getCurrentTime();
            },

            timeBeforeSessionExp() {
                return this.getCountdownToEndSession();
            },

            countdownToDispModal() {
                return this.getCookieExpTimestamp - this.delayToDispModal - this.getCurrentTime();
            },

            refreshTokenUrl() {
                return this.$backendUrl + 'front-api/refresh-token';
            }

        },

        async mounted() {
            
            await this.calculateTokenExpiration();

        },

        methods: {

            ...mapActions(['setSessionCountdown']),

            logout() {
                initLogout();
            },

            getCurrentTime() {
                return Math.floor(Date.now() / 1000);
            },

            getCountdownToDispModal() {
                return this.getCookieExpTimestamp - this.delayToDispModal - this.getCurrentTime();
            },

            getCountdownToEndSession() {
                return this.getCookieExpTimestamp - this.getCurrentTime();
            },
            
            triggerModal() {

                console.log('init trigger modal');

                if (!this.modalTriggered) {

                    let myModal = new Modal(document.getElementById('session-expire'));
                    myModal.show();

                }

                this.modalTriggered = true;
                console.log('this.modalTriggered: ' + this.modalTriggered);

                // Todo : track the active modal in the vuex store
                /* 
                    
                    Utiliser le state activeModal dans le store pour tracker si la pop up est déjà active.
                    Car pour le moment à chaque fois qu'on change de page entre le moment oul'on est connecté
                    et le moment ou la pop up doit s'afficher la pop up se crée plusieurs fois dans le code. 

                */

            },

            calculateTokenExpiration() {

                // Méthode a utiliser pour calculer le délai avant l'expiration du token pour afficher le modal
                // Modal qui permettra à l'utilisateur de se déconnecter ou de rester connecté (en utilisant le refresh token pour accéder un nouveau access token)
                
                console.log("timeBeforeModalDisplay: " + this.timeBeforeModalDisplay);
                console.log("timeBeforeSessionExp: " + this.timeBeforeSessionExp);
                console.log("getCountdownToEndSession(): " + this.getCountdownToEndSession());

                if (this.timeBeforeModalDisplay <= 0 && !this.modalTriggered) {

                    console.log('activate the modal!');
                    this.triggerModal();

                }
                
                if (this.getCountdownToEndSession() > 0 && !this.countdownInterval && !this.getSessionCountdownTriggered) {

                    // Si le temps restant est positif et que l'on n'a pas encore lancé le countdown, on le démarre.

                    this.setSessionCountdown(true);

                    this.countdownInterval = setInterval(() => {

                        if (this.getCountdownToDispModal() <= 0 && !this.modalTriggered) {

                            this.triggerModal();

                        } else if (this.modalTriggered) {

                            console.log("getCountdownToEndSession(): " + this.getCountdownToEndSession());
                            console.log("timeBeforeSessionExp(): " + this.timeBeforeSessionExp);

                        }

                        if (this.getCountdownToEndSession() <= 0) {

                            clearInterval(this.countdownInterval);
                            this.countdownInterval = null;
                            this.logout();

                        }
 
                    }, 1000); // Rafraîchit toutes les secondes

                }

            },

            async refreshToken() {

                console.log('init refresh token session');
                console.log('refreshTokenUrl: ' + this.refreshTokenUrl);

                const refreshToken = Cookies.get('refreshToken');
                console.log("refreshToken: " + refreshToken);

                // Création d'une instance Axios avec le refresh token actuel
                const axiosWithAuth = axiosInstance(refreshToken);

                try {

                    const response = await axiosWithAuth.get(this.refreshTokenUrl);

                    /*
                    console.log('response.data');
                    console.log(response.data);
                    */

                    const newAccessToken = response.data.newToken;

                    if (newAccessToken) {

                        Cookies.set('accessToken', newAccessToken, { sameSite: 'Strict' });
                        window.location.reload();

                    }


                } catch(err) {

                    console.error(err);

                }

            }

        }

    }

</script>
