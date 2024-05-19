<template>

    <div class="d-flex flex-wrap flex-row mb-3 mt-4 justify-content-between">
        <div class="p-3 m-2 bg-body-secondary rounded flex-column flex-fill">

            <h3>My Credits</h3>

            <p><strong>Your current balance:</strong> <span class="display-6">{{ credit }} credit(s)</span></p>

        </div>
        <div class="p-3 m-2 bg-body-secondary rounded flex-column flex-fill">

            <h3>Buy new Credits</h3>

        </div>
    </div>

</template>

<script>

    import { mapState } from 'vuex';

    export default {

        name: 'CreditSection',

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['credit'])

        },

        mounted() {
            //console.log(this.username);
        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }

    }

</script>