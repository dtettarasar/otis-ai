<template>

    
    <div>
        <h2>{{ username }} is connected to the All User Articles page</h2>
    </div>

    <div class="container">

        <div class="row">

            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="articleId in articleIds" :key="articleId">

                <ArticleCard :articleId="articleId"></ArticleCard>

            </div>

        </div>

    </div>

</template>

<script>

    import { mapState } from 'vuex';
    import ArticleCard from '@/components/article_components/ArticleCard.vue';
    import { toRaw } from 'vue';

    export default {
        name: 'AllUserArticlesContent.vue',

        components: {

            ArticleCard

        },

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username', 'articleIds']),

        },

        mounted() {

            // console.log("mount the AllUserArticlesContent component");
            // console.log("article to display");
            // console.log(toRaw(this.articleIds));

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>

<style>

</style>