<template>

    <div class="container mt-4 p-5 bg-dark text-white rounded">

        <div class="row justify-content-start">

            <h2>Hello, {{ username }}!</h2>
            <p>& welcome to your account :)</p>
            
        </div>

        <div class="row justify-content-start">

            <div class="col-2">
                <button type="button" class="btn btn-success">Create article</button>
            </div>

            <div class="col-2">
                <button type="button" class="btn btn-light">My settings</button>
            </div>

        </div>

        
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: 'UserAccountBanner',

        data() {

            return {

            }

        },

        computed: {
            
            ...mapState(['username'])

        },

        mounted() {
            //console.log(this.username);
        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>