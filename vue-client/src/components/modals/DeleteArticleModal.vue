<template>

    <!-- Modal -->
    <div class="modal fade" id="deleteArticleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete this article?</h1>
                </div>

                <div v-if="!deletionDone && deleteArticleId">

                    <div class="modal-body">

                        <div v-if="articleObj">

                            <h2>{{ articleObj.title }}</h2>
                            <p class="article-desc"><strong>Description: </strong>{{ articleObj.description }}</p>
                            <p><strong>Creation date: </strong><span class="article-date">{{ this.formattedDates.creationDate }}</span></p>

                        </div>

                        <div v-else>
                            <p><strong>Error: </strong> can't get article infos</p>
                        </div>

                        <p>Keep in mind that once the article has been deleted, it cannot be recovered!</p>
                    </div>

                    <div class="modal-footer">
                        <button v-on:click="initArticleDeletion()" type="button" class="btn btn-danger">I confirm deletion</button>
                        <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="clearDeleteArticleId">Cancel</button>
                    </div>

                </div>

                <div v-else-if="deletionDone && !deleteArticleId">

                    <div class="modal-body">
                        <h2>Deletion done</h2>
                        <p v-if="redirection" > You will be redirected to your account page shortly. </p>
                    </div>

                    <div v-if="!redirection">

                        <div class="modal-footer">
                            <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="handleClose">Close</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>

    import Cookies from 'js-cookie';
    import axios from 'axios';
    import { mapState, mapActions, mapGetters } from 'vuex';

    export default {

        name: 'DeleteArticleModal',

        props: {
            // Pour rediriger vers la page user account
            redirection: {
                type: Boolean,
                required: true
            }
        },

        data() {

            return {

                deletionDone: false,

            }

        },

        computed: {

            ...mapState(['deleteArticleId']),

            ...mapGetters(['getArticleById']),

            articleObj() {
                return this.getArticleById(this.deleteArticleId);
            },

            /*
            deleteArticleModalId() {
                return 'deleteArticleModal';
            },
            */

            deleteArticleBackendUrl() {

                return this.$backendUrl + 'front-api/user-delete-article';

            },

            formattedDates() {

                return {

                    creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
                    lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

                }

            },

        },

        methods: {

            ...mapActions(['deleteArticleIdFromStore', 'deleteArticleObjFromStore','clearDeleteArticleId']),

            async initArticleDeletion() {

                console.log('init article deletion method');

                console.log('id: ' + this.deleteArticleId);

                console.log('articleObj: ');

                console.log(this.articleObj);

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
                        this.deleteArticleObjFromStore(response.data.articleDeletionResponse.encryptedArticleID);
                        this.deletionDone = true;

                        /*

                        TODO : faire le nécessaire ici pour mettre à jour le template : informer que l'article à bien été supprimé
                        Si la modal a été invoqué depuis la page article editor, alors envoyer un événement pour l'article editor renvoie l'utilisateur vers la page all articles
                        
                        */

                        if (this.redirection) {

                            setTimeout(()=> {
                                //this.$router.push('/user-account');
                                window.location.href = '/user-account';
                            }, 2000);

                        }

                    } else {

                        console.log("error: can't delete article: " + response.data.articleDeletionResponse.encryptedArticleID);

                    }

                } catch (error) {

                    console.error(error);

                } finally {

                    this.clearDeleteArticleId();

                }

            },

            handleClose() {
                this.clearDeleteArticleId();
                this.resetDeletionStatus();
            },

            resetDeletionStatus() {
                this.deletionDone = false;
            },

        },

    };

</script>