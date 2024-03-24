<template>

    <div>
        
        <form action="#" method="post">

            <p>Please use the form below to login to your account.</p>

            <div class="mb-3">

                <label class="form-label" for="username"><b>Username</b></label>
                <input class="form-control" type="text" placeholder="Enter Username" name="username" id="username" required>

            </div>

            <div class="mb-3">

                <label class="form-label" for="psw"><b>Password</b></label>
                <input class="form-control" type="password" placeholder="Enter Password" name="psw" id="psw" required>
                
            </div>

            <button type="submit" class="btn btn-primary">Login</button>

        </form>

    </div>

</template>

<script>

    export default {
        name: 'LoginForm',
    }

</script>

<style>
</style>