import React from 'react'
import { shallow } from 'enzyme'
import Homepage from '../../src/scripts/pages/Homepage'

describe('Homepage Component', () => {
  const setup = (propOverrides) => {
    const wrapper = shallow(<Homepage />)
    return {
      wrapper
    }
  }
  
  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})