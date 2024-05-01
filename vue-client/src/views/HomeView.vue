<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';
  import HomeContent from '@/components/page_main_containers/HomeContent.vue';

  export default {
    name: 'HomeView',

    components: {
      PageTitle,
      UserRestrictedContent,
      HomeContent,
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Home Page"></PageTitle>
    <UserRestrictedContent v-bind:loginRequired="false">
      <HomeContent></HomeContent>
    </UserRestrictedContent>
  </main>
</template>

<style>

</style>
