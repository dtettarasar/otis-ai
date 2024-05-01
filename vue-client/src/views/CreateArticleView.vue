<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import CreateArticleContent from '@/components/page_main_containers/CreateArticleContent.vue'

  export default {
    name: 'CreateArticleView',
    components: {
      PageTitle,
      UserAccessControl,
      CreateArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Create article Page"></PageTitle>
    <UserAccessControl v-bind:loginRequired="true">
      <CreateArticleContent></CreateArticleContent>
    </UserAccessControl>
  </main>
</template>