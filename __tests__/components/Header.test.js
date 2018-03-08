import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../src/scripts/components/Header'

describe('Header Component', () => {
  const setup = () => {
    const wrapper = shallow(<Header />)
    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('has Searchbox Component', () => {
    const { wrapper } = setup()
    expect(wrapper.find('withRouter(Connect(Searchbox))').exists()).toBe(true)
  })

  it('has login button', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.login-btn').exists()).toBe(true)
  })
})
