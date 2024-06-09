<template>
    <div>
      <p v-if="isEditMode && articleObj">Editing Article ID: {{ articleObj.id }}</p>
      <p v-else>Creating a New Article</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
  