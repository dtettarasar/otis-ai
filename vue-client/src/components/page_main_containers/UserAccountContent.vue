<template>

    <UserAccountBanner></UserAccountBanner>

    <div class="container">

        <div class="row">

            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="articleId in limitedArticleIds" :key="articleId">

                <ArticleCard :articleId="articleId"></ArticleCard>

            </div>

        </div>

    </div>
    
    <CreditSection></CreditSection>

</template>

<script>

    import { mapState } from 'vuex';
    import UserAccountBanner from '@/components/page_banners/UserAccountBanner.vue';
    import CreditSection from '@/components/user_account_components/CreditSection.vue';
    import ArticleCard from '@/components/article_components/ArticleCard.vue';

    export default {
        name: 'UserAccountContent',

        components: {
            UserAccountBanner,
            CreditSection,
            ArticleCard
        },

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['username', 'articleIds']),

            limitedArticleIds() {
                // slice() est utilisé sans arguments pour créer une copie du tableau et éviter de modifier l'original
                // reverse() inverse l'ordre des articles pour récupérer les plus récents en premier
                // slice(0, 3) pour obtenir les 3 premiers articles de ce tableau inversé, les 3 articles les plus récents
                return this.articleIds.slice().reverse().slice(0, 3);
            }

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