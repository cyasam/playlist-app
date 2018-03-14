import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Searchpage, mapStateToProps, loadData } from '../../src/scripts/pages/Searchpage'
import fetchSearch from '../../src/scripts/actions/fetch-search'

const createMockStore = configureMockStore([thunk])

describe('SearchPage Component', () => {
  const setup = (propOverrides, stateOverrides) => {
    const state = {
      search: {
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
        ],
        query: 'abc',
        nextPageToken: 'CBgQAA'
      },
      ...stateOverrides
    }

    const store = createMockStore(state)

    const props = {
      searchResult: state.search,
      fetchSearch: jest.fn(),
      loadmoreSearch: jest.fn(),
      history: {
        push: jest.fn()
      },
      match: {
        params: { query: 'abc' }
      },
      ...propOverrides
    }
    const wrapper = shallow(<Searchpage {...props} />)

    return {
      wrapper,
      props,
      state,
      store
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders properly when search query is not exist', () => {
    const { props } = setup({
      match: {
        params: { query: null }
      }
    })
    expect(props.fetchSearch()).toMatchSnapshot()
  })

  it('returns searchResult object when initialize component', () => {
    const { state } = setup()
    expect(mapStateToProps(state).searchResult).toEqual(state.search)
  })

  it('calls fetchSearch if video length is 0', () => {
    const { wrapper, props, state } = setup(null, {
      search: {
        isFetching: false,
        videos: [],
        query: 'abc'
      }
    })

    wrapper.instance().componentDidMount()
    expect(props.fetchSearch).toHaveBeenCalledWith(state.search.query)
  })

  it('calls loadmoreSearch when calling loadMore', () => {
    const { wrapper, props, state } = setup()
    wrapper.instance().loadMore('abc')
    expect(props.loadmoreSearch).toHaveBeenCalledWith(state.search.query, 'abc')
  })

  it('checks loadData function', () => {
    const { store, props } = setup()
    expect(loadData(store, props.match)).toEqual(Promise.all([ store.dispatch(fetchSearch(props.match.params.query)) ]))
  })
})
