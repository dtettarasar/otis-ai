<template>
    
    <div>
      <p v-if="isEditMode && articleObj">Editing Article ID: {{ articleObj.id }}</p>
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
          </div>

          <div class="mb-3">

            <label class="form-label" for="keywords">Keywords</label>

            <input v-model="addKeyWrdField" id="keywords" type="text" class="form-control mb-4">

            <div class="mb-4 d-flex justify-content-start flex-wrap" id="keywords-container">

              <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row" v-for="(keyword, index) in articleObj.keywordObj" :key="index">
                <p class="fs-6 m-1 align-self-center">{{keyword}}</p>
                <button @click="removeKeyword(index)" class="btn-close align-self-center" type="button" aria-label="Close"></button>
              </div>

            </div>

            <button v-on:click="addKeywords" type="button" class="btn btn-secondary">Add keywords</button>

          </div>

        </div>

        <div v-if="!this.isEditMode" class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <h2>Generate Text with AI</h2>

          <p>The description and keywords defined above will be used to generate your article</p>

          <div v-if="credit">

            <p class="text-primary mt-2">You have <strong>{{ credit }}</strong> credit(s).</p>
            <a type="button" class="btn btn-success ">Use 1 credit to generate an article</a>

          </div>

          <div v-else>

            <p class="text-danger mt-2" ><strong>You need credits to generate articles with AI</strong></p>
            <button disabled class="btn btn-success ">Use 1 credit to generate an article</button>
            
          </div>

        </div>

        <button type="submit" class="btn btn-primary">Save</button>

      </form>

    </div>

  </template>
  
  <script>

    import { retrieveArticleData } from '@/custom_modules/retrieveArticleData.js';
    import { toRaw } from 'vue';
    import { mapState } from 'vuex';
  
    export default {
        
      name: 'ArticleEditorForm.vue',

      data() {

        return {

          articleObj: {
            id: null,
            title: '',
            description: '',
            keywordObj: [],
            content: '',
            creationDate: null,
            lastModifDate: null,
            errorMessages: null
          },

          addKeyWrdField: null,
          keywordsLimit: 10,
          keywordMaxLength: 30,
          keyWordIdCount: 0,
          errorMessage: null,
          isEditMode: false

        };

      },

      computed: {
            
            ...mapState(['credit'])

      },

      methods: {

        async saveArticle() {

          console.log('init save article method');
          this.isEditMode = true;

        },

        addKeywords() {

          console.log('init add keywords method');

          let simplifiedKeyWord = null;
          
          if (Object.keys(this.articleObj.keywordObj).length == this.keywordsLimit ) {

            console.log(`you can add a maximum of ${this.keywordsLimit} keywords`);

          } else if (!this.addKeyWrdField) {

            console.log('field should not be empty');

          } else if (this.addKeyWrdField.length > this.keywordMaxLength) {

            console.log(`make sure your keywords doesn't exceed ${this.keywordMaxLength} characters`);

          } else {

            simplifiedKeyWord = this.addKeyWrdField.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
            this.articleObj.keywordObj.push(simplifiedKeyWord);

            console.log('keyword value: ');
            console.log(this.addKeyWrdField);

            console.log('simplified Keyword value: ' + simplifiedKeyWord);

            console.log('keywordObj: ');
            console.log(toRaw(this.articleObj.keywordObj));

            this.addKeyWrdField = '';

            this.keyWordIdCount++;

          }

        },

        removeKeyword(index) {
          console.log('init remove keyword method');
          this.articleObj.keywordObj.splice(index, 1);
          console.log('Updated keywordObj: ');
          console.log(toRaw(this.articleObj.keywordObj));
        }

      },

      async mounted() {

        const articleId = this.$route.params.id;
        if (articleId) {

          this.isEditMode = true;
          console.log('retrieving article data');

          try {

            this.articleObj = await retrieveArticleData(articleId);
            console.log(toRaw(this.articleObj));

          } catch (error) {

            console.error('Error retrieving article data:', error);
            this.errorMessage = 'Failed to load article data. Please try again later.';

          }

        }

      }
    };

  </script>
  