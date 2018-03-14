import React from 'react'
import { shallow } from 'enzyme'
import LoginForm from '../../src/scripts/components/LoginForm'

describe('LoginForm Component', () => {
  const setup = () => {
    const wrapper = shallow(<LoginForm />)

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  describe('Form elements', () => {
    it('has form element', () => {
      const { wrapper } = setup()
      expect(wrapper.find('form').exists()).toBe(true)
    })

    it('has input email element', () => {
      const { wrapper } = setup()
      expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    })

    it('has input password element', () => {
      const { wrapper } = setup()
      expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    })

    it('has submit button', () => {
      const { wrapper } = setup()
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })
  })

  describe('Form input element', () => {
    it('loads initial state', () => {
      const { wrapper } = setup()
      expect(wrapper.state().email).toEqual('')
      expect(wrapper.state().password).toEqual('')
    })

    it('saves input values into state when typing', () => {
      const { wrapper } = setup()
      wrapper.find('input[type="email"]').simulate('change', {target: { value: 'abc@mail.com' }})
      wrapper.find('input[type="password"]').simulate('change', {target: { value: 'abcde' }})

      expect(wrapper.state().email).toEqual('abc@mail.com')
      expect(wrapper.state().password).toEqual('abcde')
    })

    it('calls handleSubmit when hitting submit button', () => {
      const { wrapper } = setup()

      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
    })
  })
})
