import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm.vue';
import axios from 'axios';
import Cookies from 'js-cookie';

describe('LoginForm.vue', () => {

    it('submits the form successfully when all conditions are met', async () => {
        // Mock axios post request to return success
        vi.spyOn(axios, 'post').mockResolvedValue({
            data: {
                authSuccess: true,
                accessToken: 'fakeAccessToken',
                refreshToken: 'fakeRefreshToken'
            }
        });

        // Mock Cookies.set
        const setCookieSpy = vi.spyOn(Cookies, 'set');

        const wrapper = mount(LoginForm);
        const form = wrapper.find('form');
    
        // Simulate user input
        await wrapper.setData({
            user: {
                name: 'validusername',
                pwd: 'Password1!'
            }
        });
    
        // Submit the form
        await form.trigger('submit.prevent');
    
        // Wait for Vue to re-render after form submission
        await wrapper.vm.$nextTick();
    
        // Assert that success message is displayed
        expect(wrapper.find('.alert-success').exists()).toBe(true);
        
        // Check if the cookies were set
        expect(setCookieSpy).toHaveBeenCalledWith('accessToken', 'fakeAccessToken', { sameSite: 'Strict' });
        expect(setCookieSpy).toHaveBeenCalledWith('refreshToken', 'fakeRefreshToken', { sameSite: 'Strict' });
    });

    it('shows error message when authentication fails', async () => {
        // Mock axios post request to return failure
        vi.spyOn(axios, 'post').mockResolvedValue({
            data: {
                authSuccess: false
            }
        });

        const wrapper = mount(LoginForm);
        const form = wrapper.find('form');
    
        // Simulate user input
        await wrapper.setData({
            user: {
                name: 'invalidusername',
                pwd: 'Password1!'
            }
        });
    
        // Submit the form
        await form.trigger('submit.prevent');
    
        // Wait for Vue to re-render after form submission
        await wrapper.vm.$nextTick();
    
        // Assert that error message is displayed
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

});
