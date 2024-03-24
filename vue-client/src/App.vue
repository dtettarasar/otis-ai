<script setup>
import { RouterLink, RouterView } from 'vue-router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar></NavBar>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

nav a {
  margin: 5px;
}

</style>
