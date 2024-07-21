import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import DeleteArticleModal from './DeleteArticleModal.vue';

describe('DeleteArticleModal.vue', () => {

    let wrapper;

    const createComponent = (props = {}) => {
        return mount(DeleteArticleModal, {
            props,
        });
    };

    beforeEach(() => {
        // Initialise les props avant chaque test

        // A Ajuster car on utilise plus de props
        wrapper = createComponent({
            articleId: '12345',
            articleTitle: 'Test Article',
            creationDate: '2023-07-08'
        });
    });

    afterEach(() => {
        // Démonte le composant après chaque test
        wrapper.unmount();
    });

    it('renders correctly with given props', () => {
        // Vérifie que le composant rend correctement avec les props fournies
        expect(wrapper.find('h2').text()).toBe('Test Article');
        expect(wrapper.find('p').text()).toContain('2023-07-08');
    });

    it('generates correct modal ID', () => {
        // Vérifie que l'ID du modal est généré correctement
        expect(wrapper.vm.deleteArticleModalId).toBe('delete-article-12345');
        expect(wrapper.find('.modal').attributes('id')).toBe('delete-article-12345');
    });

    it('has confirm and cancel buttons', () => {
        // Vérifie que les boutons de confirmation et d'annulation sont présents
        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(2);
        expect(buttons[0].text()).toBe('I confirm deletion');
        expect(buttons[1].text()).toBe('Cancel');
    });

});
