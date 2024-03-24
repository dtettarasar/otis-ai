<template>

    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Otis</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                    <a class="nav-link" href="/about">About</a>
                    <a class="nav-link" href="/all-user-article">All User Article</a>
                    <a class="nav-link" href="/view-article">View article</a>
                    <a class="nav-link" href="/create-article">Create Article</a>
                    <a class="nav-link" href="/edit-article">Edit article</a>
                    <a class="nav-link" href="/login">Login</a>
                    <a class="nav-link" href="/register">Register</a>
                    <a class="nav-link" href="/user-account">User Account</a>
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