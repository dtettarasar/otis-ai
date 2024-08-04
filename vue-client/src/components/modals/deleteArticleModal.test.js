import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DeleteArticleModal from './DeleteArticleModal.vue';
import { createStore } from 'vuex';
import axios from 'axios';

// Mock the axios module
vi.mock('axios');

describe('DeleteArticleModal.vue', () => {

    let wrapper;
    let store;
    let actions;
    let getters;
    let state;

    const createComponent = (props = {}) => {
        return mount(DeleteArticleModal, {
            props,
            global: {
                plugins: [store]
            }
        });
    };

    beforeEach(() => {
        // Initialise les props avant chaque test

        // Mock the vuex store
        actions = {

            deleteArticleObjFromStore: vi.fn(),
            clearDeleteArticleId: vi.fn()

        };

        getters = {

            getArticleById: () => () => ({
                title: 'Test Article',
                description: 'Test Description',
                creationDate: '2023-07-08'
            })

        };

        state = {
            deleteArticleId: '12345'
        };

        store = createStore({
            actions,
            getters,
            state
        });

        // Mock axios.post to return a resolved promise with specific response
        axios.post.mockResolvedValue({
            data: {
                articleDeletionResponse: {
                    deletionStatus: true,
                    encryptedArticleID: 'encrypted12345'
                }
            }
        });

        wrapper = createComponent({
            redirection: false
        });

    });

    afterEach(() => {
        // Vérifie que le wrapper est défini avant de démonter
        if (wrapper) {
            wrapper.unmount();
        }
    });

    it('renders correctly with given props and state', () => {

        // Vérifie la présence du composant
        expect(wrapper.exists()).toBe(true);

        // Vérifie le titre de l'article
        expect(wrapper.find('h2').text()).toBe('Test Article');

        // Vérifie la description de l'article
        expect(wrapper.find('.article-desc').text()).toContain('Test Description');

        // Vérifie la date de création formatée correctement
        const formattedDate = new Date('2023-07-08').toLocaleDateString();
        expect(wrapper.find('.article-date').text()).toContain(formattedDate);

    });

    it('has confirm and cancel buttons', () => {
        // Vérifie que les boutons de confirmation et d'annulation sont présents
        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(2);
        expect(buttons[0].text()).toBe('I confirm deletion');
        expect(buttons[1].text()).toBe('Cancel');
    });

    it('handles article deletion correctly', async () => {
        // Simule la suppression de l'article
        await wrapper.find('button.btn-danger').trigger('click');
        expect(actions.deleteArticleObjFromStore).toHaveBeenCalled();
        expect(wrapper.vm.deletionDone).toBe(true);
    });

});
