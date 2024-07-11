<template>

    <!-- Modal -->
    <div class="modal fade" :id="deleteArticleModalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete this article?</h1>
                </div>
                <div class="modal-body">
                    <p>Do you want to delete this article ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger">I confirm deletion</button>
                    <button data-bs-dismiss="modal" type="button" class="btn btn-primary">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { Modal } from 'bootstrap';
    import Cookies from 'js-cookie';

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
            }
        },

        computed: {

            deleteArticleModalId() {
                return `delete-article-${this.articleId}`
            }

        }

    }

</script>