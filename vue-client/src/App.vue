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
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/all-user-article">All User Article</RouterLink>
        <RouterLink to="/view-article">View article</RouterLink>
        <RouterLink to="/create-article">Create Article</RouterLink>
        <RouterLink to="/edit-article">Edit article</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/user-account">User Account</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

nav a {
  margin: 5px;
}

</style>
