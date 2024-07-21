<template>

    <!-- Modal -->
    <div class="modal fade" id="deleteArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete this article?</h1>
                </div>
                <div class="modal-body">
                    <h2>{{ articleTitle }}</h2>
                    <p><strong>Creation date: </strong>{{ creationDate }}</p>
                    <p>Keep in mind that once the article has been deleted, it cannot be recovered!</p>
                </div>
                <div class="modal-footer">
                    <button v-on:click="initArticleDeletion()" type="button" class="btn btn-danger">I confirm deletion</button>
                    <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="clearDeleteArticleId">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { mapState, mapActions } from 'vuex';

    export default {

        name: 'DeleteArticleModal',

        data() {

            return {

            }

        },

        computed: {

            ...mapState(['deleteArticleId']),

            deleteArticleModalId() {
                return 'deleteArticleModal';
            },

            deleteArticleBackendUrl() {

                return this.$backendUrl + 'front-api/user-delete-article';

            },

            articleTitle() {
                // Fetch article title from Vuex store or a method
                return 'Test title'; // remplacer avec la méthode adéquate pour récupérer le titre
            },

            creationDate() {
                // Fetch article creation date from Vuex store or a method
                return '00/00/0000'; // remplacer avec la méthode adéquate pour récupérer la date
            },

        },

        methods: {

            ...mapActions(['deleteArticleIdFromStore', 'clearDeleteArticleId']),

            async initArticleDeletion() {

                console.log('init article deletion method');

                const postObj = {

                    accessToken: Cookies.get('accessToken'),
                    articleId: this.deleteArticleId

                }

                console.log(postObj);

                try {

                    const response = await axios.post(this.deleteArticleBackendUrl, postObj);
                    console.log("response data articleDeletionResponse:");
                    console.log(response.data.articleDeletionResponse);

                    if (response.data.articleDeletionResponse.deletionStatus === true) {

                        console.log("successfully deleted article: " + response.data.articleDeletionResponse.encryptedArticleID);
                        this.deleteArticleIdFromStore(response.data.articleDeletionResponse.encryptedArticleID);

                        /*

                        TODO : faire le nécessaire ici pour mettre à jour le template : informer que l'article à bien été supprimé
                        Si la modal a été invoqué depuis la page article editor, alors envoyer un événement pour l'article editor renvoie l'utilisateur vers la page all articles
                        
                        */

                    } else {

                        console.log("error: can't delete article: " + response.data.articleDeletionResponse.encryptedArticleID);

                    }

                } catch (error) {

                    console.error(error);

                } finally {

                    this.clearDeleteArticleId();

                }

            },

        },

    };

</script>