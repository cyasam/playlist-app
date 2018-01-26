import React from 'react'
import { shallow } from 'enzyme'
import { Homepage } from '../../src/scripts/pages/Homepage'

describe('Searchbox Component', () => {
  const setup = (propOverrides) => {
    const props = {
      searchResult: {
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
      },
      ...propOverrides
    }
    const wrapper = shallow(<Homepage { ...props } />)
    return {
      wrapper,
      props
    }
  }
  
  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})