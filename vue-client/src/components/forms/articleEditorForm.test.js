import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import ArticleEditorForm from '@/components/forms/ArticleEditorForm.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createStore } from 'vuex';

// Créer mock du router 
const router = createRouter({

    history: createMemoryHistory(),
    routes: [
        { path: '/article/:id', component: ArticleEditorForm },
    ],

});

// Créer mock du store
const store = createStore({

    state: {
        credit:1,
    },

    getters: {
        credit: (state) => state.credit,
    }

});

describe('ArticleEditorForm.vue', () => {

    let wrapper;

    // fonction qui va créer le composant
    const createComponent = (data = {}) => {

        return mount(ArticleEditorForm, {

            global: {
                plugins: [store, router],
            },

            data() {
                return {

                    isEditMode: true,
                    isViewMode: false,
                    articleObj: {
                        id: 'test_id',
                        title: '',
                        description: '',
                        keywordArr: [],
                        language: 'en',
                        content: '',
                        creationDate: null,
                        lastModifDate: null,
                        errorMessages: null
                    },
                    ...data

                };
            },

        });

    };

    beforeEach(async () => {
        wrapper = createComponent();
        await router.isReady();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('affiche le message approprié en mode édition', async () => {
        expect(wrapper.text()).toContain('Editing Article ID: test_id');
    });

    it('affiche le message approprié en mode visualisation', async () => {
        await wrapper.setData({ isEditMode: false, isViewMode: true });
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Viewing Article ID: test_id');
    });

    it('affiche le message approprié en mode création', async () => {
        await wrapper.setData({ isEditMode: false, isViewMode: false });
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Creating a New Article');
    });

});

