<template>

    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><RouterLink to="/">Otis</RouterLink></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" aria-current="page" href="#"><RouterLink to="/">Home</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/about">About</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/all-user-article">All User Article</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/view-article">View article</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/create-article">Create Article</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/edit-article">Edit article</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/login">Login</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/register">Register</RouterLink></a>
                    <a class="nav-link" href="#"><RouterLink to="/user-account">User Account</RouterLink></a>
                </div>
                </div>
            </div>
        </nav>
    </div>

</template>

<script>

    export default {
        name: 'NavBar',
    }

</script>

<style>

</style>