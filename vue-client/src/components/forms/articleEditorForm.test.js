import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createStore } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

import ArticleEditorForm from '@/components/forms/ArticleEditorForm.vue';

// Mock d'axios et de js-cookie
vi.mock('axios');
vi.mock('js-cookie');

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

        await wrapper.setData({
            articleObj: {
                id: 'test_id',
            }
        });

        expect(wrapper.text()).toContain('Editing Article ID: test_id');

    });

    it('affiche le message approprié en mode visualisation', async () => {

        await wrapper.setData({

            articleObj: {
                id: 'test_id',
            },

            isEditMode: false,
            isViewMode: true

        });

        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Viewing Article ID: test_id');

    });

    it('affiche le message approprié en mode création', async () => {
        await wrapper.setData({ isEditMode: false, isViewMode: false });
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Creating a New Article');
    });

    it('ajoute un mot clé', async () => {

        await wrapper.setData({ addKeyWrdField: 'TestKeyword' });
        await wrapper.vm.addKeywords();
        expect(wrapper.vm.articleObj.keywordArr).toContain('testkeyword'); // testkeyword car les mots-clés sont mis en minuscule

    });

    it('ne pas ajouter de mot clé si le champ est vide', async () => {

        await wrapper.setData({ addKeyWrdField: '' });
        await wrapper.vm.addKeywords();
        expect(wrapper.vm.articleObj.keywordArr.length).toBe(0);

    });

    it('ne pas ajouter de mot clé si la limite est atteinte', async () => {

        // Remplir keywordArr avec 10 mots-clés pour ce test spécifique
        await wrapper.setData({
            articleObj: {
                keywordArr: Array(10).fill('keyword')
            }
        });

        await wrapper.setData({ addKeyWrdField: 'NewKeyword' });
        await wrapper.vm.addKeywords();
        expect(wrapper.vm.articleObj.keywordArr.length).toBe(10); // toujours 10, le nouveau mot-clé n'est pas ajouté

    });

    it('vérifie les paramètres de descriptions et mot clés valides', async () => {

        await wrapper.setData({
            articleObj: {
                description: 'Test Description',
                keywordArr: ['keyword1', 'keyword2'],
            }
        });

        expect(wrapper.vm.descParamOk).toBe(true);
        expect(wrapper.vm.keyWordsParamOk).toBe(true);

    });

    it('vérifie les paramètres de descriptions et mots cles vides', async () => {

        await wrapper.setData({
            articleObj: {
                description: '',
                keywordArr: [],
            }
        });

        expect(wrapper.vm.descParamOk).toBe(false);
        expect(wrapper.vm.keyWordsParamOk).toBe(false);

    });

    it('génère proprement un article', async () => {

        // Mock des cookies et appel axios
        Cookies.get.mockReturnValue('mocked-access-token');
        axios.post.mockResolvedValue({ data: { articleId: 'test_id' } });

        axios.get.mockResolvedValue({
            data: {
                articleId: 'test_id',
                articleTitle: 'Test Title',
                articleDesc: 'Test Description',
                articleContent: 'Test Content',
                articleLang: 'en',
                articleKeywords: ['keyword1', 'keyword2'],
                articleCreationDate: '2024-01-01',
                articleLastModifiedDate: '2024-01-01',
            },
        });

        const wrapper = createComponent({
            articleObj: {
                description: 'Test Description',
                keywordArr: ['keyword1', 'keyword2'],
            },
        });

        await wrapper.setData({ articleObj: { id: null } }); // S'assurer que l'id est null au début

        expect(wrapper.vm.articleObj.id).toBe(null); // Vérifier que l'ID est null au début

        await wrapper.vm.generateArticle();
        await flushPromises();

        // Tester les infos de l'article enregistré dans le composant
        expect(wrapper.vm.articleObj.id).toBe('test_id');
        expect(wrapper.vm.articleObj.title).toBe('Test Title');
        expect(wrapper.vm.articleObj.description).toBe('Test Description');
        expect(wrapper.vm.articleObj.keywordArr).toStrictEqual(['keyword1', 'keyword2']);
        expect(wrapper.vm.articleObj.language).toBe('en');
        expect(wrapper.vm.articleObj.content).toBe('Test Content');
        expect(wrapper.vm.articleObj.creationDate).toBe('2024-01-01');
        expect(wrapper.vm.articleObj.lastModifDate).toBe('2024-01-01');

        // vérifier que le composant passe en mode visualisation une fois l'article généré
        expect(wrapper.vm.isViewMode).toBe(true);

    });

});

