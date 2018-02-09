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
        location: { search: '?query=serdar' },
      },
      ...propOverrides
    }
    const wrapper = shallow(<Searchpage { ...props } />)
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
    expect(mockMountPage.mock.calls.length).toEqual(1)
  })

  it('pushs history to Homepage action when search query id is not defined in query string', () => {
    const { wrapper, props } = setup({ 
      history: {
        push: jest.fn(),
        location: {
          search: '?query='
        }
      }
    }, { search: { isFetching: true, videos: [] } })

    wrapper.instance().componentDidMount()
    expect(props.history.push).toHaveBeenCalled()
  })

  it('renders properly when search query is not exist', () => {
    const { wrapper, props } = setup({
      history: { 
        location: { search: null }
      },
    })
    expect(props.fetchSearch()).toMatchSnapshot()
  })

  it('returns searchResult object when initialize component', () => {
    const { wrapper, state } = setup()
    expect(mapStateToProps(state).searchResult).toEqual(state.search)
  })

  it('calls loadmoreSearch when calling loadMore', () => {
    const { wrapper, props, state } = setup()
    wrapper.instance().loadMore('abc')
    expect(props.loadmoreSearch).toHaveBeenCalledWith(state.search.query, 'abc')
  })
})