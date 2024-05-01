<template>

    <a @click="triggerModal()">test trigger modal</a>

    <!-- Modal -->
    <div class="modal fade" id="session-expire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Continue Working</button>
                <button v-on:click="logout" type="button" class="btn btn-primary">Log Out</button>
            </div>
            </div>
        </div>
    </div>


</template>

<script>

    import { Modal } from 'bootstrap';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import { initLogout } from '@/custom_modules/logoutSession';

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
                return this.getCookieExpTimestamp - this.getCurrentTime();
            }

        },

        async mounted() {
            
            await this.calculateTokenExpiration();
            console.log('cookieExpTimestamp from getter (SessionExpirationModal component):', this.getCookieExpTimestamp);

        },

        methods: {

            ...mapActions(['setSessionCountdown']),

            logout() {
                initLogout();
            },

            getCurrentTime() {
                return Math.floor(Date.now() / 1000);
            },
            
            triggerModal() {

                console.log('init trigger modal');

                let myModal = new Modal(document.getElementById('session-expire'));
                this.modalTriggered = true;
                console.log('this.modalTriggered: ' + this.modalTriggered);
                myModal.show();

                // Todo : track the active modal in the vuex store
                /* 
                    
                    Utiliser le state activeModal dans le store pour tracker si la pop up est déjà active.
                    Car pour le moment à chaque fois qu'on change de page entre le moment oul'on est connecté
                    et le moment ou la pop up doit s'afficher la pop up se crée plusieurs fois dans le code. 

                */

            },

            calculateTokenExpiration() {

                console.log('init calculateTokenExpiration()');
                // console.log('cookieExpTimestamp: ' + this.getCookieExpTimestamp);
                // console.log('userLoggedIn: ' + this.userLoggedIn);
                // console.log('sessionCountdownTriggered: ' + this.getSessionCountdownTriggered );
                // console.log('token expiration: ' + this.getCookieExpTimestamp);

                // Méthode a utiliser pour calculer le délai avant l'expiration du token pour afficher le modal
                // Modal qui permettra à l'utilisateur de se déconnecter ou de rester connecté (en utilisant le refresh token pour accéder un nouveau access token)
                
                console.log("timeBeforeModalDisplay: " + this.timeBeforeModalDisplay);

                console.log("timeBeforeSessionExp: " + this.timeBeforeSessionExp);

                if (this.timeBeforeModalDisplay <= 0 && !this.modalTriggered) {

                    console.log('activate the modal!');
                    this.triggerModal();

                }
                
                if (this.timeBeforeSessionExp > 0 && !this.countdownInterval && !this.getSessionCountdownTriggered) {

                    // Si le temps restant est positif et que l'on n'a pas encore lancé le countdown, on le démarre.

                    this.setSessionCountdown(true);

                    this.countdownInterval = setInterval(() => {

                        const countdownToDispModal = this.getCookieExpTimestamp - this.delayToDispModal - this.getCurrentTime();
                        const countdownToEndSession = this.getCookieExpTimestamp - this.getCurrentTime();

                        console.log("Modal à afficher dans " + countdownToDispModal + " secondes.");
                        console.log('La session se cloture dans ' + countdownToEndSession + " secondes.");

                        if (countdownToDispModal <= 0 && !this.modalTriggered) {

                            this.triggerModal();

                        }

                        if (countdownToEndSession <= 0) {

                            clearInterval(this.countdownInterval);
                            this.countdownInterval = null;
                            this.logout();

                        }
 
                    }, 1000); // Rafraîchit toutes les secondes

                }

            }

        }

    }

</script>
