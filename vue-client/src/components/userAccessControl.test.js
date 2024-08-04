import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserAccessControl from './UserAccessControl.vue';
import { createStore } from 'vuex';
import { nextTick } from 'vue';

describe('UserAccessControl.vue', () => {

  let store

  beforeEach(() => {
    store = createStore({
      state: {
        username: '',
        credit: 0,
        userLoggedIn: false,
        userInitialInfoSaved: false
      },
      getters: {
        getCookieExpTimestamp: () => null
      },
      actions: {
        updateUserLoggedIn: vi.fn(),
        saveUserInfo: vi.fn(),
        saveCookieExpTimestamp: vi.fn()
      }
    })
  })

  it('shows login message when login is required and user is not logged in', async () => {
    const wrapper = mount(UserAccessControl, {
      props: {
        loginRequired: true
      },
      global: {
        plugins: [store]
      }
    })

    // Simuler que loginStatus est false
    wrapper.setData({ loginStatus: false })
    await nextTick()

    expect(wrapper.text()).toContain('You must be logged in to access this page')
  })

  it('shows slot content when login is required and user is logged in', async () => {
    const wrapper = mount(UserAccessControl, {
      props: {
        loginRequired: true
      },
      global: {
        plugins: [store]
      },
      slots: {
        default: '<div class="slot-content">Content</div>'
      }
    })

    // Simuler que loginStatus est true
    wrapper.setData({ loginStatus: true })
    await nextTick()

    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  it('shows slot content when login is not required', async () => {
    const wrapper = mount(UserAccessControl, {
      props: {
        loginRequired: false
      },
      global: {
        plugins: [store]
      },
      slots: {
        default: '<div class="slot-content">Content</div>'
      }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  it('calls fetchData when component is mounted', () => {
    const fetchDataSpy = vi.spyOn(UserAccessControl.methods, 'fetchData')

    mount(UserAccessControl, {
      props: {
        loginRequired: true
      },
      global: {
        plugins: [store]
      }
    })

    expect(fetchDataSpy).toHaveBeenCalled()
  })
})
