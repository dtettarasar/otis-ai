<script setup>
import { RouterLink, RouterView } from 'vue-router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
