<template>
    
    <div>
      <p v-if="isEditMode && articleObj">Editing Article ID: {{ articleObj.id }}</p>
      <p v-if="isViewMode && articleObj">Viewing Article ID: {{ articleObj.id }}</p>
      <p v-else>Creating a New Article</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>

    <div>

      <form @submit.prevent="saveArticle" method="post" >

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

          <p>The description and keywords defined above will be used to generate your article</p>

          <div v-if="credit">

            <p class="text-primary mt-2">You have <strong>{{ credit }}</strong> credit(s).</p>
            <a @click="generateArticle()" type="button" class="btn btn-success ">Use 1 credit to generate an article</a>

          </div>

          <div v-else>

            <p class="text-danger mt-2" ><strong>You need credits to generate articles with AI</strong></p>
            <button disabled class="btn btn-success ">Use 1 credit to generate an article</button>
            
          </div>

        </div>

        <button type="submit" class="btn btn-primary">Save</button>

      </form>

    </div>

    <div class="mt-2" v-if="isViewMode && articleObj">
      
      <div v-html="articleObj.content" ></div>

    </div>

  </template>
  
  <script>

    import { retrieveArticleData } from '@/custom_modules/retrieveArticleData.js';
    import { toRaw } from 'vue';
    import { mapState } from 'vuex';
    import axios from 'axios';
    import Cookies from 'js-cookie';
  
    export default {
        
      name: 'ArticleEditorForm.vue',

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

            }

      },

      methods: {

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

          try {

            const response = await axios.post(this.createArticleBackendUrl, {
                accessToken: accessToken,
                articleTitle: this.articleObj.title,
                articleDesc: this.articleObj.description,
                articleLang: this.articleObj.language,
                articleKeywords: this.articleObj.keywordArr
            });

            console.log("response data:")
            console.log(response.data);

            //window.location.href = `/create-article/${response.data.articleId}`;

          } catch (err) {

            console.error(err);

          }

        },

        async testRetrieveArticleData(articleId) {

          console.log('init the testRetrieveArticleData method');

          const accessToken = Cookies.get('accessToken');

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
        }

      },

      async mounted() {

        const articleId = this.$route.params.id;
        if (articleId) {

          this.isViewMode = true;
          console.log('retrieving article data');

          this.testRetrieveArticleData(articleId);

          try {

            const retrievedData = await retrieveArticleData(articleId);

            if (retrievedData.errorMessages == null) {

              this.articleObj.id = retrievedData.id;
              this.articleObj.title = retrievedData.title;
              this.articleObj.description = retrievedData.description;
              this.articleObj.content = retrievedData.content;
              this.articleObj.language = retrievedData.language;
              this.articleObj.keywordArr = retrievedData.keywords;
              this.articleObj.creationDate = retrievedData.creationDate;
              this.articleObj.lastModifDate = retrievedData.lastModifDate;

            }

            console.log(toRaw(this.articleObj));

          } catch (error) {

            console.error('Error retrieving article data:', error);
            this.errorMessage = 'Failed to load article data. Please try again later.';

          }

        }

      }
    };

  </script>
  