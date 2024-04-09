<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserRestrictedContent from '@/components/UserRestrictedContent.vue';
  import AllUserArticlesContent from '@/components/page_main_containers/AllUserArticlesContent.vue';

  export default {
    name: 'AllUserArticlesView',
    components: {
      PageTitle,
      UserRestrictedContent,
      AllUserArticlesContent
    }
  }

</script>

<template>
  <main>
    <PageTitle txtValue="All user articles Page"></PageTitle>
    <UserRestrictedContent>
      <AllUserArticlesContent></AllUserArticlesContent>
    </UserRestrictedContent>
  </main>
</template>