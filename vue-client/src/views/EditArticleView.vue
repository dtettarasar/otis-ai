<script>

  import PageTitle from '@/components/PageTitle.vue';
  import EditArticleContent from '@/components/page_main_containers/EditArticleContent.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';

  export default {
    name: 'EditArticleView',
    components: {
      PageTitle,
      UserAccessControl,
      EditArticleContent
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Edit article Page"></PageTitle>
    <UserAccessControl v-bind:loginRequired="true">
      <EditArticleContent></EditArticleContent>
    </UserAccessControl>
  </main>
</template>