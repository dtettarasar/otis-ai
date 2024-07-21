<template>

    <div>
        <h2>{{ username }} is connected to the All User Articles page</h2>
    </div>

    <div class="container">

        <div class="row">

            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="articleId in reverseArticleList" :key="articleId">

                <ArticleCard :articleId="articleId" @delete-article="prepareToDelete"></ArticleCard>

            </div>

        </div>

    </div>

    <DeleteArticleModal />

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import ArticleCard from '@/components/article_components/ArticleCard.vue';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';
    import { Modal } from 'bootstrap';
    import { toRaw } from 'vue';

    export default {
        name: 'AllUserArticlesContent.vue',

        components: {

            ArticleCard,
            DeleteArticleModal,

        },

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username', 'articleIds']),

            reverseArticleList() {
                // pour afficher les articles les plus récents en premier
                return this.articleIds.slice().reverse();
            }

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

            ...mapActions(['setDeleteArticleId']),

            prepareToDelete(articleId) {
                this.setDeleteArticleId(articleId);
                const myModal = new Modal(document.getElementById('deleteArticleModal'));
                myModal.show();
            },

        },
    };

</script>

<style>

</style>