<template>

    
    <div>
        <h2>{{ username }} is connected to the Edit Article page</h2>
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: 'EditArticleContent.vue',

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