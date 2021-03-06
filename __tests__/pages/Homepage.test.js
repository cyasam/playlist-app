import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Homepage, mapStateToProps, loadData } from '../../src/scripts/pages/Homepage'
import fetchTrendings from '../../src/scripts/actions/fetch-trendings'

const createMockStore = configureMockStore([thunk])

describe('Homepage Component', () => {
  const setup = (propsOverride) => {
    const state = {
      trendings: {
        isFetching: false,
        videos: [
          {
            id: 'lZoA5ZX4wC0',
            title: 'Video Title',
            description: 'Lorem ipsum dolor sit amed.',
            thubmnail: 'video-thumbnail.jpg'
          },
          {
            id: 'lZoA5ZX4wC01',
            title: 'Video Title 2',
            description: 'Lorem ipsum dolor sit amed.',
            thubmnail: 'video-thumbnail-2.jpg'
          }
        ]
      }
    }

    const store = createMockStore(state)

    const props = {
      trendings: state.trendings,
      fetchTrendings: jest.fn(),
      ...propsOverride
    }
    const wrapper = shallow(<Homepage {...props} />)
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

  it('returns trendings object when initialize component', () => {
    const { store, state } = setup()
    expect(mapStateToProps(store.getState()).trendings).toEqual(state.trendings)
  })

  it('checks loadData function', () => {
    const { store } = setup()
    expect(loadData(store)).toEqual(Promise.all([ store.dispatch(fetchTrendings()) ]))
  })
})
