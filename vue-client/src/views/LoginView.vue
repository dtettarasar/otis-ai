<script>

  import PageTitle from '@/components/PageTitle.vue'
  import LoginForm from '@/components/forms/LoginForm.vue'

  export default {
    name: 'LoginView',
    components: {
      PageTitle,
      LoginForm
    }

  };

</script>

<template>
  <main>
    <PageTitle txtValue="Login Page"></PageTitle>

    <LoginForm></LoginForm>
    
  </main>
</template>