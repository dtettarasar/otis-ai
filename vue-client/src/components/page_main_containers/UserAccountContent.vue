<template>

    <UserAccountBanner></UserAccountBanner>

    <div class="container mt-4 mb-4">

        <div class="row">
            <div class="col-12">

                <h2>You last articles</h2>

            </div>
        </div>

        <div class="row">

            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="articleObj in limitedArticleDataList" :key="articleObj.id">

                <ArticleCard :articleId="articleObj.id" @delete-article="prepareToDelete"></ArticleCard>

            </div>

        </div>

    </div>
    
    <CreditSection></CreditSection>

    <DeleteArticleModal :redirection=false />

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { Modal } from 'bootstrap';

    import UserAccountBanner from '@/components/page_banners/UserAccountBanner.vue';
    import CreditSection from '@/components/user_account_components/CreditSection.vue';
    import ArticleCard from '@/components/article_components/ArticleCard.vue';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';

    export default {
        name: 'UserAccountContent',

        components: {
            UserAccountBanner,
            CreditSection,
            ArticleCard,
            DeleteArticleModal,
        },

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['username', 'articleDataList']),

            limitedArticleDataList() {
                // slice() est utilisé sans arguments pour créer une copie du tableau et éviter de modifier l'original
                // reverse() inverse l'ordre des articles pour récupérer les plus récents en premier
                // slice(0, 3) pour obtenir les 3 premiers articles de ce tableau inversé, les 3 articles les plus récents
                return this.articleDataList.slice().reverse().slice(0, 3);
            },

        },

        mounted() {
            //console.log(this.username);
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

        }
    }

</script>