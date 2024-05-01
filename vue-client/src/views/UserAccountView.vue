<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccountContent from '@/components/page_main_containers/UserAccountContent.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';

  export default {
    name: 'UserAccountView',
    components: {
      PageTitle,
      UserAccountContent,
      UserRestrictedContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="User Account Page"></PageTitle>
    <UserRestrictedContent v-bind:loginRequired="true">
      <UserAccountContent></UserAccountContent>
    </UserRestrictedContent>
  </main>
</template>