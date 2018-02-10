import React from 'react'
import { shallow } from 'enzyme'
import VideoViews from '../../../src/scripts/components/video/VideoViews'

describe('VideoViews Component', () => {
  const setup = (propOverrides) => {
    const props = {
      viewCount: '900',
      ...propOverrides
    }
    const wrapper = shallow(<VideoViews {...props} />)
    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  describe('Summary type', () => {
    it('renders with K if viewCount is less than 1K', () => {
      const { wrapper, props } = setup({
        viewCount: '604',
        format: 'summary'
      })
      expect(wrapper.instance().formatSummary(props.viewCount)).toEqual('604')
    })
  
    it('renders with K if viewCount is greater equal than 1K', () => {
      const { wrapper, props } = setup({
        viewCount: '11604',
        format: 'summary'
      })
      expect(wrapper.instance().formatSummary(props.viewCount)).toEqual('11K')
    })
  
    it('renders with K if viewCount is greater equal than 1M', () => {
      const { wrapper, props } = setup({
        viewCount: '12322751',
        format: 'summary'
      })
      expect(wrapper.instance().formatSummary(props.viewCount)).toEqual('12.3M')
    })
  
    it('renders with K if viewCount is greater equal than 1B', () => {
      const { wrapper, props } = setup({
        viewCount: '2392751038',
        format: 'summary'
      })
      expect(wrapper.instance().formatSummary(props.viewCount)).toEqual('2.3B')
    })
  })

  describe('Numeric type', () => {
    it('renders if viewCount is less than 1K', () => {
      const { wrapper, props } = setup({
        viewCount: '604'
      })
      expect(wrapper.instance().formatSummary(props.viewCount)).toEqual('604')
    })
  
    it('renders if viewCount is greater equal than 1K', () => {
      const { wrapper, props } = setup({
        viewCount: '11604'
      })
      expect(wrapper.instance().formatNumeric(props.viewCount)).toEqual('11,604')
    })
  
    it('renders if viewCount is greater equal than 1M', () => {
      const { wrapper, props } = setup({
        viewCount: '12322751'
      })
      expect(wrapper.instance().formatNumeric(props.viewCount)).toEqual('12,322,751')
    })
  
    it('renders if viewCount is greater equal than 1B', () => {
      const { wrapper, props } = setup({
        viewCount: '2392751038'
      })
      expect(wrapper.instance().formatNumeric(props.viewCount)).toEqual('2,392,751,038')
    })
  })
})