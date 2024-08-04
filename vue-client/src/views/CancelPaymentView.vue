<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import CancelPaymentContent from '@/components/page_main_containers/CancelPaymentContent.vue';

  export default {
    name: 'CancelPaymentView',
    components: {
      PageTitle,
      UserAccessControl,
      CancelPaymentContent
    }

  };

</script>

<template>
  <main>

    <PageTitle txtValue="Checkout canceled"></PageTitle>

    <UserAccessControl v-bind:loginRequired="true">
      <CancelPaymentContent></CancelPaymentContent>
    </UserAccessControl>

  </main>
</template>