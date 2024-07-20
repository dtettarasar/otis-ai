<template>
    
    <div class="m-2 p-5 bg-dark-subtle rounded" >

        <h1>{{ this.articleObj.title }}</h1>

        <p class="fs-5 date-text"><strong>creation date:</strong> {{this.formattedDates.creationDate}} </p>
        <p class="fs-5 date-text"><strong>last modification date:</strong> {{this.formattedDates.lastModifDate}} </p>

        <div>

            <div v-if="this.articleObj.keywordArr.length != 0">

                <p class="fs-5 mt-4">keywords:</p>

                <div class="mb-2 d-flex justify-content-start flex-wrap">

                    <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
                        <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                    </div>

                </div>

            </div>
            

            

            <div class="d-flex flex-row flex-wrap">

                <router-link class="btn btn-dark m-1 p-2" :to=this.articlePageLink><i class="bi bi-eye-fill"></i> View</router-link>
                <button class="btn btn-success m-1 p-2"><i class="bi bi-pen-fill"></i> Edit</button>
                <button v-on:click="deleteArticle()" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>

            </div>

        </div>

    </div>

    <DeleteArticleModal :articleId="articleId" :articleTitle="articleObj.title" :creationDate="this.formattedDates.creationDate" ></DeleteArticleModal>

</template>

<script>

    /* 
    
    TODO: 

    Trouver un moyen d'appeler le component DeleteArticleModal ailleurs qu'ici : car lors de la suppression de l'article id, l'article card associé est effacé de la page
    ce qui par conséquent efface également le delete article modal et donc empêche de l'utiliser proprement
    
    */

    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { Modal } from 'bootstrap';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';

    export default {
        name: 'ArticleCard',

        components: {

            DeleteArticleModal,

        },
        
        props: {
            articleId: {
                type: String,
                required: true
            }
        },

        data() {

            return {

                articleObj: {

                    id: null,
                    title: '',
                    description: '',
                    keywordArr: [],
                    language: 'en',
                    content: '',
                    creationDate: null,
                    lastModifDate: null,
                    errorMessages: null

                }

            }

        },

        computed: {

            articlePageLink() {

                return `/article/${this.articleId}`;

            },

            retrieveArticleBackendUrl() {

                return this.$backendUrl + 'front-api/retrieve-article-data';

            },

            formattedDates() {

                return {

                    creationDate: this.articleObj.creationDate ? new Date(this.articleObj.creationDate).toLocaleDateString() : '',
                    lastModifDate: this.articleObj.lastModifDate ? new Date(this.articleObj.lastModifDate).toLocaleDateString() : '',

                }

            },

            deleteArticleModalId() {
                return `delete-article-${this.articleId}`
            }

        },

        methods: {

            async retrieveArticleData(articleId) {

                const accessToken = Cookies.get('accessToken');

                console.log('init the retrieveArticleData method from the article card');

                console.log("articleID: ");
                console.log(articleId);

                try {

                    const response = await axios.get(this.retrieveArticleBackendUrl, {

                        params : {

                            articleId: articleId,
                            accessToken: accessToken

                        }

                    });

                    console.log(response.data);

                    if (response.data.errorMessages == null) {

                        this.articleObj.id = response.data.articleId;
                        this.articleObj.title = response.data.articleTitle;
                        this.articleObj.description = response.data.articleDesc;
                        this.articleObj.content = response.data.articleContent;
                        this.articleObj.language = response.data.articleLang;
                        this.articleObj.keywordArr = response.data.articleKeywords;
                        this.articleObj.creationDate = response.data.articleCreationDate;
                        this.articleObj.lastModifDate = response.data.articleLastModifiedDate;

                    }

                } catch(err) {

                    console.error(err);

                }
                
                console.log('end of the retrieveArticleData method from the article card');

            },

            async deleteArticle() {
               
                console.log('init delete article');
                console.log(this.deleteArticleModalId);
                let myModal = new Modal(document.getElementById(this.deleteArticleModalId));
                myModal.show();

            }

        },

        async mounted() {

            if (this.articleId) {

                await this.retrieveArticleData(this.articleId);

            }

        }

    }

</script>

<style>

    .date-text {
        margin-bottom: 0px;
    }

</style>