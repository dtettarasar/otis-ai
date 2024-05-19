<template>

    <UserAccountBanner></UserAccountBanner>
    <CreditSection></CreditSection>

</template>

<script>

    import { mapState } from 'vuex';
    import UserAccountBanner from '@/components/page_banners/UserAccountBanner.vue';
    import CreditSection from '@/components/user_account_components/CreditSection.vue';

    export default {
        name: 'UserAccountContent',

        components: {
            UserAccountBanner,
            CreditSection
        },

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['username'])

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