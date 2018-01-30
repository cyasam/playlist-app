import React from 'react'
import { shallow } from 'enzyme'
import { Homepage, mapStateToProps } from '../../src/scripts/pages/Homepage'

describe('Homepage Component', () => {
  const setup = (propsOverride) => {
    const state = {
      trendings: {
        isfetching: false,
        videoData: [
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
      trendings: state.trendings,
      fetchTrendings: jest.fn(),
      ...propsOverride
    }
    const wrapper = shallow(<Homepage { ...props } />)
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

  it('renders Loading when isFetching is true', () => {
    const { wrapper } = setup({
      trendings: { isFetching: true }
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('Loading').exists()).toBe(true)
  })

  it('returns trendings object when initialize component', () => {
    const { state } = setup()
    expect(mapStateToProps(state).trendings).toEqual(state.trendings)
  })
})