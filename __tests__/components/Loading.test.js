import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../../src/scripts/components/Loading'

describe('Loading Component', () => {
  const wrapper = shallow(<Loading />)

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has loading class div', () => {
    expect(wrapper.find('.loading').exists()).toBe(true)
  })
})
