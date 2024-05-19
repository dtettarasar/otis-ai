<template>

    <p>This is the credit section</p>

    <p>Test: user has {{ credit }} credit(s)</p>

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