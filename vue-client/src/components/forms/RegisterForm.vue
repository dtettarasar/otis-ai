<template>

    <div>
        <form @submit.prevent="submitForm" method="post">

            <p>Please use the form below to create your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="email"><i class="bi bi-envelope-at-fill"></i> <b>Email</b></label>
                <input v-model="user.email" class="form-control" type="email" placeholder="Enter Email" name="email" id="email" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>

                <div class="input-group">

                    <input v-bind:type="showPassword ? 'text' : 'password'" v-model="user.pwd" class="form-control" placeholder="Enter Password" name="pwd" id="pwd" required>
                    
                    <button @click="showPassword = !showPassword" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPassword" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw-repeat"><i class="bi bi-key-fill"></i> <b>Repeat Password</b></label>

                <div class="input-group">

                    <input v-bind:type="showPasswordRepeat ? 'text' : 'password'" v-model="user.pwdRepeat" class="form-control" placeholder="Repeat Password" name="pwd-repeat" id="pwd-repeat" required>

                    <button @click="showPasswordRepeat = !showPasswordRepeat" class="btn btn-outline-secondary" type="button">
                        <i v-if="!showPasswordRepeat" class="bi bi-eye-fill"></i>
                        <i v-else class="bi bi-eye-slash-fill"></i>
                    </button>

                </div>

                

            </div>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="btn btn-primary">Create account</button>

            <div v-if="!passwordsMatch" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> Please make sure your password match.
            </div>

            <div v-if="!isPasswordSecure && user.pwd != ''" class="alert mt-3 alert-danger" >
                <i class="bi bi-exclamation-circle"></i> Your password isn't secure enough: please make sure it contains at least 8 characters, including at least one lowercase letter, one uppercase letter, one number and one special character.
            </div>

        </form>
    </div>

</template>

<script>

    import axios from 'axios';

    export default {
        name: 'RegisterForm',
        data() {
            return {
                user: {
                    name: '',
                    pwd: '',
                    email:'',
                    pwdRepeat: ''
                },
                showError: false,
                showSuccess: false,
                showPassword: false,
                showPasswordRepeat: false
            }
        },
        computed: {

            passwordsMatch() {
                return this.user.pwd === this.user.pwdRepeat;
            },

            isPasswordSecure() {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return regex.test(this.user.pwd);
            },

            registerBackEndUrl() {
                return this.$backendUrl + 'front-api/user-create';
            }

        },
        methods: {

            async submitForm() {

                console.log('init form submission');

                if (this.passwordsMatch == false) {
                    console.log('Error: password mismatch, form cannot create account');
                } else if (this.isPasswordSecure == false) {
                    console.log('Error: password isnt secure, form cannot create account');
                } else {

                    this.createUserReq();

                }

            },

            async createUserReq() {

                console.log("init createUserReq Method");

                const dataToSend = {
                    username: this.user.name,
                    password: this.user.pwd,
                    email: this.user.email
                }

                console.log(dataToSend);

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