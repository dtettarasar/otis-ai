import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest' // to test the loggout function
import NavBar from './NavBar.vue'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'

// All routes used in the component
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/login', component: { template: '<div>Login</div>' } },
  { path: '/register', component: { template: '<div>Register</div>' } },
  { path: '/about', component: { template: '<div>About</div>' } },
  { path: '/all-user-article', component: { template: '<div>All User Article</div>' } },
  { path: '/view-article', component: { template: '<div>View Article</div>' } },
  { path: '/article', component: { template: '<div>Create Article</div>' } },
  { path: '/edit-article', component: { template: '<div>Edit Article</div>' } },
  { path: '/user-account', component: { template: '<div>User Account</div>' } }
]

// Build the test router
const router = createRouter({
  history: createMemoryHistory(),
  routes
})

// Build the test store
const createVuexStore = (userLoggedIn) => {
  return createStore({
    state: {
      userLoggedIn: userLoggedIn
    }
  })
}

describe('NavBar.vue', () => {
  it('shows login and register links when user is not logged in', async () => {
    const store = createVuexStore(false) // Test without user logged in
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store, router] // include store & router in the test
      }
    })

    await router.isReady() // Make sure the router is loaded & ready before testing

    expect(wrapper.find('a.nav-link[href="/login"]').exists()).toBe(true)
    expect(wrapper.find('a.nav-link[href="/register"]').exists()).toBe(true)
    expect(wrapper.find('a.nav-link[href="/user-account"]').exists()).toBe(false)
  })

  it('shows user-specific links when user is logged in', async () => {
    const store = createVuexStore(true) // Test with user logged in
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store, router] // include store & router in the test
      }
    })

    await router.isReady() // Make sure the router is loaded & ready before testing

    expect(wrapper.find('a.nav-link[href="/login"]').exists()).toBe(false)
    expect(wrapper.find('a.nav-link[href="/register"]').exists()).toBe(false)
    expect(wrapper.find('a.nav-link[href="/user-account"]').exists()).toBe(true)
  })

  it('calls logout method when logout link is clicked', async () => {
    const store = createVuexStore(true) // Test with user logged in
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store, router] // include store & router in the test
      }
    })

    await router.isReady() // Make sure the router is loaded & ready before testing

    const logoutSpy = vi.spyOn(wrapper.vm, 'logout') // use `vi` to test the logout method
    await wrapper.find('a.nav-link[href="#"]').trigger('click')
    expect(logoutSpy).toHaveBeenCalled()
  })
})
