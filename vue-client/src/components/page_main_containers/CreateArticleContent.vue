<template>

    
    <div>
        <h2>{{ username }} is connected to the Create Article page</h2>
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';
    import { retrieveArticleData } from '@/custom_modules/retrieveArticleData.js';

    export default {
        name: 'CreateArticleContent.vue',

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username']),

        },

        mounted() {

            retrieveArticleData(this.$route.params.id);

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>