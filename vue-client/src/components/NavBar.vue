<template>

    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">Otis</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        
                        <router-link class="nav-link" to="/">Home</router-link>
                        <router-link class="nav-link" to="/about">About</router-link>
                        <router-link v-if="this.userLoggedIn" class="nav-link" to="/all-user-article">All User Article</router-link>
                        <router-link v-if="this.userLoggedIn" class="nav-link" to="/view-article">View article</router-link>
                        <router-link v-if="this.userLoggedIn" class="nav-link" to="/create-article">Create Article</router-link>
                        <router-link v-if="this.userLoggedIn" class="nav-link" to="/edit-article">Edit article</router-link>
                        <router-link v-if="this.userLoggedIn" class="nav-link" to="/user-account">User Account</router-link>
                        <router-link v-if="!this.userLoggedIn" class="nav-link" to="/login">Login</router-link>
                        <router-link v-if="!this.userLoggedIn" class="nav-link" to="/register">Register</router-link>
                        <a v-on:click="logout" href="#" v-if="this.userLoggedIn" class="nav-link" >Loggout</a>

                    </div>
                </div>
            </div>
        </nav>
    </div>

</template>

<script>

    import { mapState } from 'vuex';
    import { initLogout } from '@/custom_modules/logoutSession';

    export default {
        
        name: 'NavBar',

        computed: {

            ...mapState(['userLoggedIn'])

        },

        methods: {

            logout() {
                initLogout();
            }

        }

    }

</script>

<style>

</style>