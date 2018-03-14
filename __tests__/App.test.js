import React from 'react'
import { shallow } from 'enzyme'
import Routes from '../src/scripts/Routes'
import { App } from '../src/scripts/App'

describe('App Component', () => {
  const wrapper = shallow(<App route={{ route: { Routes } }} />)

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
