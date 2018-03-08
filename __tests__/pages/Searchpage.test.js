import React from 'react'
import { shallow } from 'enzyme'
import { Searchpage, mapStateToProps } from '../../src/scripts/pages/Searchpage'

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
      state
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('calls mountPage method when first page load', () => {
    const { wrapper } = setup(null, { search: { isFetching: true, videos: [] } })
    const mockMountPage = jest.spyOn(wrapper.instance(), 'mountPage')

    wrapper.instance().componentDidMount()
    expect(mockMountPage.mock.calls).toHaveLength(1)
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

  it('calls loadmoreSearch when calling loadMore', () => {
    const { wrapper, props, state } = setup()
    wrapper.instance().loadMore('abc')
    expect(props.loadmoreSearch).toHaveBeenCalledWith(state.search.query, 'abc')
  })
})
