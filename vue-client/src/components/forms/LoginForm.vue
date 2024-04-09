<template>

    <div>
        
        <form @submit.prevent="submitForm" method="post">

            <p>Please use the form below to login to your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>

                <div class="input-group">

                    <input v-bind:type="showPassword ? 'text' : 'password'" v-model="user.pwd" class="form-control" type="password" placeholder="Enter Password" name="pwd" id="pwd" required>

                    <button @click="showPassword = !showPassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPassword" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>
                
            </div>

            <button type="submit" class="btn btn-primary">Login</button>

            <div v-if="showError" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Authentication failed. Please check your credentials and try again.
            </div>

            <div v-if="showSuccess" class="alert mt-3 alert-success" role="alert">
                <i class="bi bi-check-circle"></i> You are now logged in. You will be redirected to your account page shortly.
            </div>

        </form>

    </div>

</template>

<script>

    import axios from 'axios';
    import Cookies from 'js-cookie';

    export default {
        name: 'LoginForm',
        data() {
            return {
                user: {
                    name: '',
                    pwd: ''
                },
                showError: false,
                showSuccess: false,
                showPassword: false
            }
        },
        computed: {
            loginBackEndUrl() {
                return this.$backendUrl + 'front-api/user-login';
            }
        },
        mounted() {
            console.log(`the login form component is now mounted.`);
        },
        methods: {
            async submitForm() {
                
                //console.log(this.user);
                //console.log('backend url to use: ' + this.loginBackEndUrl);
                console.log('init login process');

                try {

                    const response = await axios.post(this.loginBackEndUrl, {
                        username: this.user.name,
                        password: this.user.pwd
                    });

                    console.log("response data:")
                    console.log(response.data);

                    if (response.data.authSuccess) {

                        this.showSuccess = true;
                        this.showError = false;

                        Cookies.set('accessToken', response.data.accessToken, { sameSite: 'Strict' });
                        Cookies.set('refreshToken', response.data.refreshToken, { sameSite: 'Strict' });

                        setTimeout(()=> {
                            //this.$router.push('/user-account');
                            window.location.href = '/user-account';
                        }, 3000);


                    } else {

                        this.showError = true;
                        this.showSuccess = false;

                    }

                } catch (err) {

                    console.error(err);
                    this.showError = true;
                    this.showSuccess = false;

                }

            }
        }
    }

</script>

<style>

    .form-label,
    .btn {
        font-size: 1.3rem;
    }

</style>