<script setup>
import { RouterLink, RouterView } from 'vue-router';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar></NavBar>
    </div>
  </header>

  <div id="inner-content" class="container">
    <RouterView />
  </div>

  <Footer></Footer>
</template>

<style scoped>

#inner-content {
  margin-top: 40px;
}

nav a {
  margin: 5px;
}

</style>
