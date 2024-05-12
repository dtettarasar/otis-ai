<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccountContent from '@/components/page_main_containers/UserAccountContent.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';

  export default {
    name: 'UserAccountView',
    components: {
      PageTitle,
      UserAccountContent,
      UserAccessControl
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Dashboard"></PageTitle>
    <UserAccessControl v-bind:loginRequired="true">
      <UserAccountContent></UserAccountContent>
    </UserAccessControl>
  </main>
</template>