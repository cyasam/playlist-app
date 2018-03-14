import React from 'react'
import { shallow } from 'enzyme'
import { Searchbox, mapStateToProps } from '../../src/scripts/components/Searchbox'

describe('Searchbox Component', () => {
  const setup = (propsOverride) => {
    const props = {
      search: {
        query: 'abc'
      },
      fetchSearch: jest.fn(),
      history: {
        push: jest.fn()
      },
      match: {
        params: { query: 'abc' }
      },
      ...propsOverride
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
      const { wrapper } = setup({ search: {
        query: ''
      },
      match: { params: { query: '' } } })
      expect(wrapper.state().input).toEqual('')
    })

    it('states input if page is search page', () => {
      const { wrapper, props } = setup()

      wrapper.instance().componentWillReceiveProps({
        search: {
          query: 'abc'
        },
        history: {
          location: {
            pathname: '/search'
          }
        }
      })
      expect(wrapper.state().input).toEqual(props.search.query)
    })

    it('states input as `` if page is not search page', () => {
      const { wrapper } = setup()

      wrapper.instance().componentWillReceiveProps({
        search: {
          query: 'abc'
        },
        history: {
          location: {
            pathname: '/'
          }
        }
      })
      expect(wrapper.state().input).toEqual('')
    })

    it('saves input value into state when typing', () => {
      const { wrapper } = setup()
      wrapper.find('input').simulate('change', {target: { value: 'abc' }})
      expect(wrapper.state().input).toEqual('abc')
    })
  })

  describe('Form element', () => {
    it('doesn`t fire handleSubmit event when submitting', () => {
      const { wrapper, props } = setup()
      wrapper.find('input').simulate('change', {target: { value: '' }})
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

      expect(props.history.push.mock.calls).toHaveLength(0)
      expect(wrapper.state().input).toHaveLength(0)
      expect(props.fetchSearch.mock.calls).toHaveLength(0)
    })

    it('fire handleSubmit event when submitting', () => {
      const { wrapper, props } = setup()
      wrapper.find('input').simulate('change', {target: { value: 'abc' }})
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

      expect(props.history.push).toHaveBeenCalled()
      expect(wrapper.state().input).toHaveLength(3)
      expect(props.fetchSearch).toHaveBeenCalledWith(wrapper.state().input)
    })
  })

  it('returns search state from mapStateToProps', () => {
    const { props } = setup()
    const result = { search: props.search }

    expect(mapStateToProps(props)).toEqual(result)
  })
})
