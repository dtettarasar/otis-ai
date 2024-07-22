<template>
    
    <div class="m-2 p-5 bg-dark-subtle rounded" >

        <h1>{{ articleObj.title }}</h1>

        <p class="fs-5 date-text"><strong>creation date:</strong> {{ formattedDates.creationDate }} </p>
        <p class="fs-5 date-text"><strong>last modification date:</strong> {{ formattedDates.lastModifDate }} </p>

        <div>

            <div v-if="articleObj.keywordArr.length != 0">

                <p class="fs-5 mt-4">keywords:</p>

                <div class="mb-2 d-flex justify-content-start flex-wrap">

                    <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
                        <p class="fs-6 m-1 align-self-center">{{ keyword }}</p>
                    </div>

                </div>

            </div>
            

            

            <div class="d-flex flex-row flex-wrap">

                <router-link class="btn btn-dark m-1 p-2" :to=articlePageLink><i class="bi bi-eye-fill"></i> View</router-link>
                <!--<button class="btn btn-success m-1 p-2"><i class="bi bi-pen-fill"></i> Edit</button>-->
                <button v-on:click="confirmDelete" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>

            </div>

        </div>

    </div>

</template>

<script>

    /* 
    
    TODO: 

    Trouver un moyen d'appeler le component DeleteArticleModal ailleurs qu'ici : car lors de la suppression de l'article id, l'article card associé est effacé de la page
    ce qui par conséquent efface également le delete article modal et donc empêche de l'utiliser proprement
    
    */

    import axios from 'axios';
    import Cookies from 'js-cookie';

    export default {
        name: 'ArticleCard',
        
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

                        this.articleObj = {
                            id: response.data.articleId,
                            title: response.data.articleTitle,
                            description: response.data.articleDesc,
                            content: response.data.articleContent,
                            language: response.data.articleLang,
                            keywordArr: response.data.articleKeywords,
                            creationDate: response.data.articleCreationDate,
                            lastModifDate: response.data.articleLastModifiedDate,
                            errorMessages: null,
                        };

                    }

                } catch(err) {

                    console.error(err);

                }
                
                console.log('end of the retrieveArticleData method from the article card');

            },

            confirmDelete() {

                /*

                    Cliquer sur "Delete" : Quand tu cliques sur le bouton "Delete" dans ArticleCard, la méthode confirmDelete est appelée.

                    Émettre un Événement : La méthode confirmDelete émet l'événement delete-article avec this.articleId comme argument.

                    Écouter l'Événement : Le composant parent AllUserArticlesContent écoute cet événement avec @delete-article="prepareToDelete".

                    Appeler une Méthode dans le Parent : Quand l'événement delete-article est capturé par le parent, la méthode prepareToDelete est appelée, recevant articleId en argument.
                    
                    Afficher le Modal : La méthode prepareToDelete met à jour l'état Vuex avec l'ID de l'article à supprimer et affiche le modal de confirmation en utilisant Bootstrap.

                */

                this.$emit('delete-article', this.articleId);
            }

        },

        async mounted() {

            if (this.articleId) {

                await this.retrieveArticleData(this.articleId);

            }

        },

    };

</script>

<style>

    .date-text {
        margin-bottom: 0px;
    }

</style>