import React from 'react'
import { shallow } from 'enzyme'
import Container from '../../src/scripts/components/Container'

describe('Container Component', () => {
  const setup = () => {
    const wrapper = shallow(<Container />)
    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('has div called container', () => {
    const { wrapper } = setup()
    expect(wrapper.find('.container').exists()).toBe(true)
  })
})
