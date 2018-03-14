import React from 'react'
import { shallow } from 'enzyme'
import { Loginpage } from '../../src/scripts/pages/Loginpage'

describe('Loginpage Component', () => {
  const setup = () => {
    const wrapper = shallow(<Loginpage />)

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
