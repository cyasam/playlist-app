import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Header, mapStateToProps } from '../../src/scripts/components/Header'

const createMockStore = configureMockStore([thunk])

describe('Header Component', () => {
  const setup = (propOverrides) => {
    const state = {
      authentication: {
        loading: false,
        auth: null,
        error: ''
      }
    }

    const store = createMockStore(state)

    const props = {
      auth: state.auth,
      ...propOverrides
    }

    const wrapper = shallow(<Header {...props} />)
    return {
      wrapper,
      props,
      store,
      state
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

  it('has login button if auth is null', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.login-btn').exists()).toBe(true)
  })

  it('has logout button if auth is not null', () => {
    const { wrapper } = setup({ auth: { user: 'abc' } })
    expect(wrapper.find('.logout-btn').exists()).toBe(true)
  })

  it('returns state from mapStateToProps', () => {
    const { store, state } = setup()
    const result = {
      auth: state.authentication.auth
    }

    expect(mapStateToProps(store.getState())).toEqual(result)
  })
})
