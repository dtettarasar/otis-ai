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

            <input id="keywords" type="text" class="form-control mb-4">

            <button type="button" class="btn btn-secondary">Add keywords</button>

          </div>

        </div>

        <div class="bg-dark-subtle rounded mt-4 mb-4 p-5">

          <h2>Generate Text with AI</h2>

          <p>The description and keywords defined above will be used to generate your article</p>

          <p v-if="credit" class="text-primary mt-2">You have <strong>{{ credit }}</strong> credit(s).</p>

          <p v-else class="text-danger mt-2" ><strong>You need credits to generate articles with AI</strong></p>

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
            content: '',
            creationDate: null,
            lastModifDate: null,
            errorMessages: null
          },

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

        },

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
  