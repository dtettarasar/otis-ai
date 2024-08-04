<script>

  import PageTitle from '@/components/PageTitle.vue';
  import UserAccessControl from '@/components/UserAccessControl.vue';
  import SuccessPaymentContent from '@/components/page_main_containers/SuccessPaymentContent.vue';

  export default {
    name: 'SuccessPaymentView',
    components: {
      PageTitle,
      UserAccessControl,
      SuccessPaymentContent
    }

  };

</script>

<template>
  <main>

    <PageTitle txtValue="Thanks for your order!"></PageTitle>

    <UserAccessControl v-bind:loginRequired="true">
      <SuccessPaymentContent></SuccessPaymentContent>
    </UserAccessControl>


  </main>
</template>