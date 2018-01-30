import React from 'react'
import { shallow } from 'enzyme'
import VideoDetail from '../../../src/scripts/components/video/VideoDetail'

describe('VideoDetail Component', () => {
  const setup = (propOverrides) => {
    const props = {
      videoId: 'g884wLr9gNc', ...propOverrides
    }
    const wrapper = shallow(<VideoDetail { ...props } />)
    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
  
  it('renders properly if videos prop is empty', () => {
    const { wrapper } = setup({ videoId: '' })
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.find('iframe').exists()).toBe(false)
  })
})