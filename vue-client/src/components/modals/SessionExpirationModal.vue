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

        computed: {

            ...mapState(['cookieExpTimestamp', 'activeModal', 'userLoggedIn']),
            ...mapGetters(['getCookieExpTimestamp'])

        },

        async mounted() {
            
            await this.calculateTokenExpiration();
            console.log('cookieExpTimestamp from getter (SessionExpirationModal component):', this.getCookieExpTimestamp);

        },

        methods: {
            
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
                console.log('cookieExpTimestamp: ' + this.cookieExpTimestamp);
                console.log('userLoggedIn: ' + this.userLoggedIn);

            }

        }

    }

</script>
