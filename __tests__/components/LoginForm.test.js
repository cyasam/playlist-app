import React from 'react'
import { shallow } from 'enzyme'
import { LoginForm } from '../../src/scripts/components/LoginForm'

describe('LoginForm Component', () => {
  const setup = (propOverrides) => {
    const props = {
      loading: false,
      auth: null,
      error: '',
      handleAuth: jest.fn(),
      history: {},
      ...propOverrides
    }

    const wrapper = shallow(<LoginForm {...props} />)

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  describe('Response elements', () => {
    it('shows loading if loading is true', () => {
      const { wrapper } = setup({ loading: true })
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('Loading').exists()).toBe(true)
    })

    it('shows you login successfully if auth is ok', () => {
      const { wrapper } = setup({ loading: false, auth: {} })
      expect(wrapper).toMatchSnapshot()

      const successEl = wrapper.find('.success-message')
      expect(successEl.exists()).toBe(true)
    })

    it('shows error if error message exits', () => {
      const { wrapper } = setup({ loading: false, error: 'abc' })
      expect(wrapper).toMatchSnapshot()

      const errorEl = wrapper.find('.error-message')
      expect(errorEl.exists()).toBe(true)
      expect(errorEl.text()).toEqual('abc')
    })
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
