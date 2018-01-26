import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/scripts/app'

describe('App Component', () => {
  const wrapper = shallow(<App />)

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has Header Component', () => {
    expect(wrapper.find('Header').exists()).toBe(true)
  })

  it('has Container Component', () => {
    expect(wrapper.find('Container').exists()).toBe(true)
  })
})