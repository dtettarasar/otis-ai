<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import ViewArticleContent from '@/components/page_main_containers/ViewArticleContent.vue';

  export default {
    name: 'ArticleView',
    components: {
      PageTitle,
      UserAccessControl,
      ViewArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="View article Page"></PageTitle>
    <UserAccessControl v-bind:loginRequired="true">
      <ViewArticleContent></ViewArticleContent>
    </UserAccessControl>
  </main>
</template>