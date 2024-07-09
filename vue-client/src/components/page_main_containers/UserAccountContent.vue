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
                return this.articleIds.slice(0, 3);
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