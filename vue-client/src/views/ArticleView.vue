<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';
  import ViewArticleContent from '@/components/page_main_containers/ViewArticleContent.vue';

  export default {
    name: 'ArticleView',
    components: {
      PageTitle,
      UserRestrictedContent,
      ViewArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="View article Page"></PageTitle>
    <UserRestrictedContent v-bind:loginRequired="true">
      <ViewArticleContent></ViewArticleContent>
    </UserRestrictedContent>
  </main>
</template>