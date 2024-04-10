<template>

    
    <div>
        <h2>{{ username }} is connected to the All User Articles page</h2>
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: 'AllUserArticlesContent.vue',

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username']),

        },

        mounted() {

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>