<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccountContent from '@/components/page_main_containers/UserAccountContent.vue';

  export default {
    name: 'UserAccountView',
    components: {
      PageTitle,
      UserAccountContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="User Account Page"></PageTitle>
    <UserAccountContent></UserAccountContent>
  </main>
</template>