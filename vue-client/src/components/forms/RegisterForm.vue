<template>

    <div>
        <form method="post">

            <p>Please use the form below to create your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><i class="bi bi-person-fill"></i> <b>Username</b></label>
                <input v-model="user.name" class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><i class="bi bi-key-fill"></i> <b>Password</b></label>
                <input v-model="user.pwd" class="form-control" type="password" placeholder="Enter Password" name="psw" id="psw" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw-repeat"><i class="bi bi-key-fill"></i> <b>Repeat Password</b></label>
                <input v-model="user.pswRepeat" class="form-control" type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>

            </div>

            <button type="submit" class="btn btn-primary">Create account</button>

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
                    pswRepeat: ''
                },
                showError: false,
                showSuccess: false
            }
        },
    }

</script>

<style>

</style>