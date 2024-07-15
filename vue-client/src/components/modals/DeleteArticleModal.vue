<template>

    <!-- Modal -->
    <div class="modal fade" :id="deleteArticleModalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete this article?</h1>
                </div>
                <div class="modal-body">
                    <h2>{{ articleTitle }}</h2>
                    <p><strong>creation date: </strong> {{ creationDate }}</p> 
                    <p>Keep in mind that once the article has been deleted, it cannot be recovered!</p>
                </div>
                <div class="modal-footer">
                    <button v-on:click="initArticleDeletion()" type="button" class="btn btn-danger">I confirm deletion</button>
                    <button data-bs-dismiss="modal" type="button" class="btn btn-primary">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Cookies from 'js-cookie';
    import axios from 'axios';

    export default {

        name: 'DeleteArticleModal',

        data() {

            return {

            }

        },

        props: {
            articleId: {
                type: String,
                required: true
            },
            articleTitle: {
                type: String,
                required: true
            },
            creationDate: {
                type: String, // ou 'Date' si tu passes un objet Date directement
                required: true
            }
        },

        computed: {

            deleteArticleModalId() {
                return `delete-article-${this.articleId}`
            },

            deleteArticleBackendUrl() {

                return this.$backendUrl + 'front-api/user-delete-article';

            },

        },

        methods: {

            async initArticleDeletion() {
                console.log('init article deletion method');

                const postObj = {

                    accessToken: Cookies.get('accessToken'),
                    articleId: this.articleId

                }

                console.log(postObj);

                try {

                    const response = await axios.post(this.deleteArticleBackendUrl, postObj);
                    console.log("response data:");
                    console.log(response.data);

                } catch (error) {

                    console.error(error);

                }

            }

        }

    }

</script>