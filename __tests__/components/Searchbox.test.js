import React from 'react'
import { shallow } from 'enzyme'
import { Searchbox } from '../../src/scripts/components/Searchbox'

describe('Searchbox Component', () => {
  const setup = (propsOverride) => {
    const props = {
      fetchSearch: jest.fn(),
      history: { 
        location: { pathname: '/' },
        push: jest.fn()
      }, ...propsOverride
    }
    const wrapper = shallow(<Searchbox {...props} />)

    return {
      wrapper,
      props
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

    it('has input text element', () => {
      const { wrapper } = setup()
      expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    })

    it('has submit button', () => {
      const { wrapper } = setup()
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })
  })

  describe('Form input element', () => {
    it('loads initial state', () => {
      const { wrapper } = setup()
      expect(wrapper.state().input).toEqual('')
    })
    
    it('loads initial state if page is search', () => {
      const { wrapper, props } = setup({
        history: { 
          location: {
            pathname: '/search',
            search: `?query=abc`
          }
        }
      })
      expect(wrapper.state().input).toEqual('abc')
    })

    it('saves input value into state when typing', () => {
      const { wrapper } = setup()
      wrapper.find('input').simulate('change', {target: { value: 'abc' }})
      expect(wrapper.state().input).toEqual('abc')
    })
  })

  describe('Form element', () => {
    it('fire handleSubmit event when submitting', () => {
      const { wrapper, props } = setup()
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn()})
      expect(props.history.push).toHaveBeenCalled()
      expect(props.fetchSearch).toHaveBeenCalledWith(wrapper.state().input)
    })
  })
})