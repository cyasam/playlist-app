import React from 'react'
import { shallow } from 'enzyme'
import { Searchpage, mapStateToProps } from '../../src/scripts/pages/Searchpage'

describe('SearchPage Component', () => {
  const setup = (propOverrides) => {
    const state = {
      search: {
        isfetching: false,
        response: [
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

    const props = {
      searchResult: state.search,
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

  it('returns searchResult object when initialize component', () => {
    const { wrapper, state } = setup()
    expect(mapStateToProps(state).searchResult).toEqual(state.search)
  })
})