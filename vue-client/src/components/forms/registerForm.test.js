import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from './RegisterForm.vue';
import axios from 'axios';

describe('RegisterForm.vue', () => {

    it('submits the form successfully when all conditions are met', async () => {
        // Mock axios post request to return success
        vi.spyOn(axios, 'post').mockResolvedValue({ data: true });
    
        const wrapper = mount(RegisterForm);
        const form = wrapper.find('form');
    
        // Simulate user input
        await wrapper.setData({
            user: {
                name: 'validusername',
                email: 'test@example.com',
                pwd: 'Password1!',
                pwdRepeat: 'Password1!'
            }
        });
    
        // Submit the form
        await form.trigger('submit');
    
        // Wait for Vue to re-render after form submission
        await wrapper.vm.$nextTick();
    
        // Assert that success message is displayed
        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });

    it('shows error message when passwords do not match', async () => {
        const wrapper = mount(RegisterForm);
        const form = wrapper.find('form');
    
        // Simulate user input with mismatched passwords
        await wrapper.setData({
            user: {
                name: 'validusername',
                email: 'test@example.com',
                pwd: 'Password1!',
                pwdRepeat: 'MismatchedPassword!'
            }
        });
    
        // Submit the form
        await form.trigger('submit');
    
        // Assert that error message for password mismatch is displayed
        expect(wrapper.find('.alert-danger').text()).toContain('Please make sure your password match.');
    });    

});
