<template>

    
    <div>
        <h2>{{ username }} is connected to the Create Article page</h2>
    </div>

    <ArticleEditorForm></ArticleEditorForm>
    

</template>

<script>

    import { mapState } from 'vuex';
    import ArticleEditorForm from '@/components/forms/ArticleEditorForm.vue';

    export default {
        name: 'CreateArticleContent.vue',

        components: {
            ArticleEditorForm
        },

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