<template>
    
    <div>
      <p v-if="isEditMode && articleObj">Editing Article ID: {{ articleObj.id }}</p>
      <p v-if="isViewMode && articleObj">Viewing Article ID: {{ articleObj.id }}</p>
      <p v-else>Creating a New Article</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>

    <!--Article in Generate mode-->

    <div v-if="!this.isViewMode">

      <form @submit.prevent="generateArticle" method="post" >

        <div class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <div class="mb-3">

            <label for="articleTitle" class="form-label">Title</label>
            <input v-model="articleObj.title" type="text" class="form-control" id="articleTitle" placeholder="write here your amazing title">

          </div>

          <div class="mb-3">
            <label for="articleDescription" class="form-label">Description</label>
            <textarea v-model="articleObj.description" class="form-control" id="articleDescription" rows="3"></textarea>
            <p class="mt-2">Character counter: <strong>{{ articleObj.description.length }} / {{ descriptionMaxLength }} </strong></p>
          </div>

          <div class="mb-3">

            <label class="form-label" for="keywords">Language</label>
            <select v-model="articleObj.language" id="language" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>

          </div>

          <div class="mb-3">

            <label class="form-label" for="keywords">Keywords</label>
            <input v-model="addKeyWrdField" id="keywords" type="text" class="form-control mb-4">
            <p class="mt-2">Character counter: <strong>{{ this.addKeyWrdField.length }} / {{ keywordMaxLength }} </strong></p>

            <div class="mb-2 d-flex justify-content-start flex-wrap" id="keywords-container">

              <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
                <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                <button @click="removeKeyword(index)" class="btn-close align-self-center" type="button" aria-label="Close"></button>
              </div>

            </div>

            <p v-if="articleObj.keywordArr.length > 0" >Keyword(s) counter: <strong> {{ articleObj.keywordArr.length }} / {{ keywordsLimit }} </strong></p>

            <button v-on:click="addKeywords" type="button" class="btn btn-secondary">Add keywords</button>

          </div>

        </div>

        <div v-if="!this.isViewMode" class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <h2>Generate Text with AI</h2>

          <div v-if="!articleInCreation">

            <p>The description and keywords defined above will be used to generate your article</p>

            <div v-if="credit">

              <p class="text-primary mt-2">You have <strong>{{ credit }}</strong> credit(s).</p>
              <button type="submit" class="btn btn-success">Use 1 credit to generate an article</button>

            </div>

            <div v-else>

              <p class="text-danger mt-2" ><strong>You need credits to generate articles with AI</strong></p>
              <button disabled class="btn btn-success ">Use 1 credit to generate an article</button>

            </div>

          </div>

          <div v-else >

            <p>Article in creation, please wait :)</p>

          </div>

        </div>

      </form>

    </div>

    <!--Article in View mode-->

    <div class="mt-2 p-5 bg-dark-subtle rounded" v-if="isViewMode && articleObj" >

      <h1>{{ articleObj.title }}</h1>

      <p class="fs-5 date-text"><strong>creation date:</strong> {{ formattedDates.creationDate }}</p>
      <p class="fs-5 date-text"><strong>last modification date:</strong> {{ formattedDates.lastModifDate }}</p>

      <div>

        <p class="fs-5">keywords:</p>

        <div class="mb-2 d-flex justify-content-start flex-wrap">

          <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordArr" :key="index">
            <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
          </div>

        </div>

        <div class="d-flex flex-row">

          <button v-on:click="switchToEditMode" class="btn btn-success m-1 p-2"><i class="bi bi-pen-fill"></i> Edit Mode</button>
          <button v-on:click="switchToViewMode" class="btn btn-primary m-1 p-2"><i class="bi bi-eye-fill"></i> View Mode</button>
          <button v-on:click="deleteArticle()" class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>
          <router-link class="btn btn-dark m-1 p-2" to="/all-user-article"><i class="bi bi-file-richtext-fill"></i> All my articles</router-link>

        </div>

      </div>


    </div>

    <div class="mt-4" v-if="isViewMode && articleObj">
      
      <div v-html="articleObj.content" ></div>

    </div>

    <!--End of Article in View mode-->

    <DeleteArticleModal :articleId="articleObj.id" :articleTitle="articleObj.title" :creationDate="this.formattedDates.creationDate" ></DeleteArticleModal>

  </template>
  
  <script>

    import { toRaw } from 'vue';
    import { mapState, mapActions } from 'vuex';
    import { Modal } from 'bootstrap';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import DeleteArticleModal from '@/components/modals/DeleteArticleModal.vue';


  
    export default {
        
      name: 'ArticleEditorForm.vue',

      components: {

        DeleteArticleModal,

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
          },

          addKeyWrdField: '',
          keywordsLimit: 10,
          keywordMaxLength: 30,
          descriptionMaxLength: 130,
          errorMessage: null,
          isEditMode: false,
          isViewMode: false,
          isGenerateMode: false,
          articleInCreation: false

        };

      },

      computed: {
            
            ...mapState(['credit']),

            keyWordsParamOk() {

              const keyWordsParamOk = this.articleObj.keywordArr.length > 0 && this.articleObj.keywordArr.length <= this.keywordsLimit;
              return keyWordsParamOk;

            },

            descParamOk() {

              return this.articleObj.description !== '';

            },

            createArticleBackendUrl() {

              return this.$backendUrl + 'front-api/user-create-article';

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
                return `delete-article-${this.articleObj.id}`
            }

      },

      methods: {

        ...mapActions(['addArticleId']),

        async saveArticle() {

          console.log('init save article method');
          this.isViewMode = true;

        },

        async generateArticle() {

          console.log('init generate article method');
          console.log('articleObj: ');
          console.log(toRaw(this.articleObj));

          const accessToken = Cookies.get('accessToken');
          console.log("accessToken:");
          console.log(accessToken);

          if (!this.descParamOk && !this.keyWordsParamOk) {

            console.log("error: no parameters");

          } else {

              try {

                this.articleInCreation = true;

                const response = await axios.post(this.createArticleBackendUrl, {
                    accessToken: accessToken,
                    articleTitle: this.articleObj.title ? this.articleObj.title : 'Untitled',
                    articleDesc: this.articleObj.description,
                    articleLang: this.articleObj.language,
                    articleKeywords: this.articleObj.keywordArr
                });

                console.log("response data:");
                console.log(response.data);

                console.log("article id: ");
                console.log(response.data.articleId);

                if (response.data.articleId) {

                  // Récupère les données de l'article qui vient d'être créé + ajout de l'id de l'aricle dans le store

                  await this.testRetrieveArticleData(response.data.articleId);
                  this.addArticleId(response.data.articleId);
                  this.isViewMode = true;

                }

                } catch (err) {

                  console.error(err);

                }

          }

        },

        async testRetrieveArticleData(articleId) {

          console.log('init the testRetrieveArticleData method');

          const accessToken = Cookies.get('accessToken');

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

          console.log('end of testRetrieveArticleData method');

        },

        addKeywords() {

          console.log('init add keywords method');

          let simplifiedKeyWord = null;
          
          if (Object.keys(this.articleObj.keywordArr).length == this.keywordsLimit ) {

            console.log(`you can add a maximum of ${this.keywordsLimit} keywords`);

          } else if (!this.addKeyWrdField) {

            console.log('field should not be empty');

          } else if (this.addKeyWrdField.length > this.keywordMaxLength) {

            console.log(`make sure your keywords doesn't exceed ${this.keywordMaxLength} characters`);

          } else {

            simplifiedKeyWord = this.addKeyWrdField.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
            this.articleObj.keywordArr.push(simplifiedKeyWord);

            console.log('keyword value: ');
            console.log(this.addKeyWrdField);

            console.log('simplified Keyword value: ' + simplifiedKeyWord);

            console.log('keywordArr: ');
            console.log(toRaw(this.articleObj.keywordArr));

            this.addKeyWrdField = '';

            this.keyWordIdCount++;

          }

        },

        removeKeyword(index) {
          console.log('init remove keyword method');
          this.articleObj.keywordArr.splice(index, 1);
          console.log('Updated keywordArr: ');
          console.log(toRaw(this.articleObj.keywordArr));
        },

        switchToEditMode() {

          console.log("switch to edit mode");

        },

        switchToViewMode() {

          console.log("switch to view mode");

        },

        async deleteArticle() {
               
               console.log('init delete article');
               console.log(this.deleteArticleModalId);
               let myModal = new Modal(document.getElementById(this.deleteArticleModalId));
               myModal.show();

        }

      },

      async mounted() {

        const articleId = this.$route.params.id;
        if (articleId) {

          this.isViewMode = true;
          console.log('retrieving article data');

          await this.testRetrieveArticleData(articleId);

        }

      }
    };

  </script>

<style>

  .date-text {
      margin-bottom: 0px;
  }

</style>
  