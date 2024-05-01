<script>

  import PageTitle from '@/components/PageTitle.vue';
  import EditArticleContent from '@/components/page_main_containers/EditArticleContent.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';

  export default {
    name: 'EditArticleView',
    components: {
      PageTitle,
      UserRestrictedContent,
      EditArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Edit article Page"></PageTitle>
    <UserRestrictedContent v-bind:loginRequired="true">
      <EditArticleContent></EditArticleContent>
    </UserRestrictedContent>
  </main>
</template>