<template>

    
    <div>
        <h2>{{ username }} is connected to the Account page</h2>
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: 'UserAccountContent',

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['username'])

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