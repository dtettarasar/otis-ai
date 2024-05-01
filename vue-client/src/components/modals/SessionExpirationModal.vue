<template>

    <a @click="triggerModal()">test trigger modal</a>

    <!-- Modal -->
    <div class="modal fade" id="session-expire" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { Modal } from 'bootstrap';
    import { mapActions, mapState, mapGetters } from 'vuex';

    export default {
        
        name: 'SessionExpirationModal',

        data() {

            return {
                countdownInterval: null
            }

        },

        computed: {

            ...mapState(['activeModal', 'userLoggedIn']),
            ...mapGetters(['getCookieExpTimestamp', 'getSessionCountdownTriggered'])

        },

        async mounted() {
            
            await this.calculateTokenExpiration();
            console.log('cookieExpTimestamp from getter (SessionExpirationModal component):', this.getCookieExpTimestamp);

        },

        methods: {

            ...mapActions(['setSessionCountdown']),
            
            triggerModal() {

                console.log('init trigger modal');

                let myModal = new Modal(document.getElementById('session-expire'));
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
                console.log('cookieExpTimestamp: ' + this.getCookieExpTimestamp);
                console.log('userLoggedIn: ' + this.userLoggedIn);
                console.log('sessionCountdownTriggered: ' + this.getSessionCountdownTriggered );

                // Méthode a utiliser pour calculer le délai avant l'expiration du token pour afficher le modal
                // Modal qui permettra à l'utilisateur de se déconnecter ou de rester connecté (en utilisant le refresh token pour accéder un nouveau access token)

                console.log('init calculateTokenExpiration method');
                console.log('token expiration: ' + this.getCookieExpTimestamp);

                // Délai à ajouter avant l'expiration du token. Permet d'afficher le modal pendant un temps donné, avant l'expiration du token et la deconnexion automatique de l'utilisateur.
                const timeToModal = 30;

                const modalTimestamp = this.getCookieExpTimestamp - timeToModal;

                // Calcul du temps restant en secondes
                const currentTime = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
                const timeRemaining = modalTimestamp - currentTime;
                console.log("timeRemaining: " + timeRemaining);

                if (timeRemaining <= 0) {

                    console.log('activate the modal!');
                    this.triggerModal();

                } else if (timeRemaining > 0 && !this.countdownInterval && !this.getSessionCountdownTriggered) {

                    // Si le temps restant est positif et que l'on n'a pas encore lancé le countdown, on le démarre

                    this.setSessionCountdown(true);
    
                    //console.log("Modal à afficher dans " + timeRemaining + " secondes.");

                    this.countdownInterval = setInterval(() => {

                        const countdown = modalTimestamp - Math.floor(Date.now() / 1000);

                        //console.log("Modal à afficher dans " + countdown + " secondes.");

                        if (countdown <= 0) {
                            clearInterval(this.countdownInterval);
                            this.countdownInterval = null;
                            console.log('activate the modal!');
                            this.triggerModal();
                        }

                    }, 1000); // Rafraîchit toutes les secondes

                    //console.log(currentTime);

                }

            }

        }

    }

</script>
