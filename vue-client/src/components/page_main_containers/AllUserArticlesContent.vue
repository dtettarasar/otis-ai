<template>

    
    <div>
        <h2>{{ username }} is connected to the All User Articles page</h2>
    </div>

    <div>
        article ID list: 

        {{ this.articleIds }}
    </div>
    

</template>

<script>

    import { mapState } from 'vuex';
    import { toRaw } from 'vue';

    export default {
        name: 'AllUserArticlesContent.vue',

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['username', 'articleIds']),

        },

        mounted() {

            // console.log("mount the AllUserArticlesContent component");
            // console.log("article to display");
            // console.log(toRaw(this.articleIds));

        },

        beforeCreate() {
        },

        beforeMount() {
        },

        methods: {

        }
    }

</script>