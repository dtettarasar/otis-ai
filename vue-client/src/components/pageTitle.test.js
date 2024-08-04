import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PageTitle from './PageTitle.vue'

describe('PageTitle.vue', () => {

  it('renders props.txtValue when passed', () => {
    const txtValue = 'Test Title';
    const wrapper = mount(PageTitle, {
      props: { txtValue }
    });
    expect(wrapper.find('#page-title').text()).toBe(txtValue);
  })

  it('matches the snapshot', () => {
    const txtValue = 'Snapshot Title'
    const wrapper = mount(PageTitle, {
      props: { txtValue }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  
})
