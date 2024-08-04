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
    
    it('shows error message when password is not secure enough', async () => {
        const wrapper = mount(RegisterForm);
        const form = wrapper.find('form');
    
        // Simulate user input with insecure password
        await wrapper.setData({
            user: {
                name: 'validusername',
                email: 'test@example.com',
                pwd: 'weakpassword',
                pwdRepeat: 'weakpassword'
            }
        });
    
        // Submit the form
        await form.trigger('submit');
    
        // Assert that error message for insecure password is displayed
        expect(wrapper.find('.alert-danger').text()).toContain('Your password isn\'t secure enough');
    });
    
    it('shows error message when username is invalid', async () => {
        const wrapper = mount(RegisterForm);
        const form = wrapper.find('form');
    
        // Simulate user input with invalid username
        await wrapper.setData({
            user: {
                name: 'invalid@username',
                email: 'test@example.com',
                pwd: 'ValidPassword1!',
                pwdRepeat: 'ValidPassword1!'
            }
        });
    
        // Submit the form
        await form.trigger('submit');
    
        // Assert that error message for invalid username is displayed
        expect(wrapper.find('.alert-danger').text()).toContain('The username can only contain letters');
    });
    
    it('shows error message when account creation fails', async () => {
        // Mock axios post request to return failure
        vi.spyOn(axios, 'post').mockRejectedValue(new Error('Account creation failed'));
    
        const wrapper = mount(RegisterForm);
        const form = wrapper.find('form');
    
        // Simulate valid user input
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
    
        // Assert that error message for account creation failure is displayed
        expect(wrapper.find('.alert-danger').text()).toContain('Account creation error');
    });

});
