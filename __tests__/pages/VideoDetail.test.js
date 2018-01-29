import React from 'react'
import { shallow } from 'enzyme'
import VideoDetail from '../../src/scripts/pages/VideoDetailpage'

describe('Video Detail Page', () => {
  const wrapper = shallow(<VideoDetail />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})