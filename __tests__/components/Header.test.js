import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Header, mapStateToProps } from '../../src/scripts/components/Header'
import { INITIAL_STATE as handleAuthInitialState } from '../../src/scripts/reducers/handle-auth'

const createMockStore = configureMockStore([thunk])

describe('Header Component', () => {
  const setup = (propOverrides) => {
    const state = {
      authentication: handleAuthInitialState
    }

    const store = createMockStore(state)

    const props = {
      auth: state.authentication.auth,
      signOut: jest.fn(),
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

  it('has login button if auth is false', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.login-btn').exists()).toBe(true)
  })

  it('has logout button if auth is true', () => {
    const { wrapper } = setup({ auth: true })
    expect(wrapper.find('.logout-btn').exists()).toBe(true)
  })

  it('calls signOut when clicking logout button', () => {
    const { wrapper, props } = setup({ auth: true })
    wrapper.find('.logout-btn').simulate('click')
    expect(props.signOut).toHaveBeenCalled()
  })

  it('returns state from mapStateToProps', () => {
    const { store, state } = setup()
    const result = {
      auth: state.authentication.auth
    }

    expect(mapStateToProps(store.getState())).toEqual(result)
  })
})
