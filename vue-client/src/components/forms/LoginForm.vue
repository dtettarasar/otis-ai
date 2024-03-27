<template>

    <div>
        
        <form action="#" method="post">

            <p>Please use the form below to login to your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><b>Password</b></label>
                <input v-model="user.pwd" class="form-control" type="password" placeholder="Enter Password" name="psw" id="psw" required>
                
            </div>

            <button type="submit" class="btn btn-primary">Login</button>

        </form>

    </div>

</template>

<script>

    export default {
        name: 'LoginForm',
        data() {
            return {
                user: {
                    name: '',
                    pwd: ''
                }
            }
        },
        computed: {
            loginBackEndUrl() {
                return this.$backendUrl + 'user/vc-login';
            }
        },
        mounted() {
            console.log(`the login form component is now mounted.`);
            console.log('backend url to use: ' + this.$backendUrl);
        }
    }

</script>

<style>
</style>