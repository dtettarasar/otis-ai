<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';
  import CreateArticleContent from '@/components/page_main_containers/CreateArticleContent.vue'

  export default {
    name: 'CreateArticleView',
    components: {
      PageTitle,
      UserRestrictedContent,
      CreateArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Create article Page"></PageTitle>
    <UserRestrictedContent v-bind:loginRequired="true">
      <CreateArticleContent></CreateArticleContent>
    </UserRestrictedContent>
  </main>
</template>