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
            <input type="text" class="form-control" id="articleTitle" placeholder="write here your amazing title">

          </div>

          <div class="mb-3">
            <label for="articleDescription" class="form-label">Description</label>
            <textarea class="form-control" id="articleDescription" rows="3"></textarea>
          </div>

        </div>

        <button type="submit" class="btn btn-primary">Save</button>

      </form>

    </div>

  </template>
  
  <script>

    import { retrieveArticleData } from '@/custom_modules/retrieveArticleData.js';
    import { toRaw } from 'vue';
  
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
  