<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import AboutContent from '@/components/page_main_containers/AboutContent.vue';

  export default {
    name: 'AboutView',
    components: {
      PageTitle,
      UserAccessControl,
      AboutContent
    }
  }

</script>

<template>
  <main>
    <PageTitle txtValue="About Page"></PageTitle>
    <UserAccessControl v-bind:loginRequired="false">
      <AboutContent></AboutContent>
    </UserAccessControl>
  </main>
</template>