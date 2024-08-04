<template>

    <div class="d-flex flex-wrap flex-column mt-4 p-5 bg-dark text-white rounded">

        <div class="d-flex flex-column">

            <h2 class="display-4">Hello, {{ username }}!</h2>
            <p class="display-6">& welcome to your account :)</p>
            
        </div>

        <div class="d-flex flex-wrap flex-row bd-highlight mb-3">

            <div class="p-2 bd-highlight">
                <a href="/article" class="btn btn-success">Create an article</a>
            </div>

            <div class="p-2 bd-highlight">
                <button type="button" class="btn btn-light">My settings</button>
            </div>

        </div>
        
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';
    import { createArticleTrigger } from '@/custom_modules/createArticleTrigger';

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

            createArticle() {
                createArticleTrigger();
            }

        }
    }

</script>