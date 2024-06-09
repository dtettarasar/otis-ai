<template>

    <p>this this the article editor component</p>

</template>

<script>

    import { retrieveArticleData } from '@/custom_modules/retrieveArticleData.js';

    export default {

        name: 'ArticleEditorForm.vue',

        mounted() {

            retrieveArticleData(this.$route.params.id);

        }

    }

</script>