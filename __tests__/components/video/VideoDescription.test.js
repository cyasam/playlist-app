import React from 'react'
import { mount } from 'enzyme'
import VideoDescription from '../../../src/scripts/components/video/VideoDescription'

describe('VideoDescription Component', () => {
  const setup = (propOverrides) => {
    const props = {
      text: `Jimmy and Paul Rudd do a shot-for-shot remake of the classic 1990 video for British pop duo Go West's "King of Wishful Thinking" from the Pretty Woman soundtrack.

      Subscribe NOW to The Tonight Show Starring Jimmy Fallon: http://bit.ly/1nwT1aN
      
      Watch The Tonight Show Starring Jimmy Fallon Weeknights 11:35/10:35c
      Get more Jimmy Fallon: 
      Follow Jimmy: http://Twitter.com/JimmyFallon
      Like Jimmy: https://Facebook.com/JimmyFallon
      
      Get more The Tonight Show Starring Jimmy Fallon: 
      Follow The Tonight Show: http://Twitter.com/FallonTonight
      Like The Tonight Show: https://Facebook.com/FallonTonight
      The Tonight Show Tumblr: http://fallontonight.tumblr.com/
      
      Get more NBC: 
      NBC YouTube: http://bit.ly/1dM1qBH
      Like NBC: http://Facebook.com/NBC
      Follow NBC: http://Twitter.com/NBC
      NBC Tumblr: http://nbctv.tumblr.com/
      NBC Google+: https://plus.google.com/+NBC/posts
      
      The Tonight Show Starring Jimmy Fallon features hilarious highlights from the show including: comedy sketches, music parodies, celebrity interviews, ridiculous games, and, of course, Jimmy's Thank You Notes and hashtags! You'll also find behind the scenes videos and other great web exclusives.
      
      Jimmy Fallon and Paul Rudd Recreate "King of Wishful Thinking" Music Video
      http://www.youtube.com/fallontonight`,
      ...propOverrides
    }
    const wrapper = mount(<VideoDescription {...props} />)
    wrapper.setState({ textHeight: 150, collapsed: true })

    return {
      wrapper,
      props
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.text').exists()).toBe(true)
    expect(wrapper.find('.more-btn').exists()).toBe(true)
  })

  it('renders properly if text prop is not defined', () => {
    const { wrapper } = setup({
      text: undefined
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.text').exists()).toBe(false)
    expect(wrapper.find('.more-btn').exists()).toBe(false)
  })

  it('states collapsed value is true calling checkHeight', () => {
    const { wrapper } = setup()
    wrapper.instance().checkHeight()
    expect(wrapper.state().collapsed).toBe(true)
  })

  it('returns className as collapsed when calling ', () => {
    const { wrapper } = setup()
    expect(wrapper.instance().renderClassName()).toEqual('text collapsed')
  })

  describe('Clicking show more/less', () => {
    const { wrapper } = setup()

    it('opens all description when clicking show more', () => {
      wrapper.find('.more-btn').simulate('click')
      expect(wrapper.state().collapsed).toBe(false)
      expect(wrapper.find('.more-btn').text()).toEqual('SHOW LESS')
    })

    it('show brief of description when clicking show more again', () => {
      wrapper.find('.more-btn').simulate('click')
      expect(wrapper.state().collapsed).toBe(true)
      expect(wrapper.find('.more-btn').text()).toEqual('SHOW MORE')
    })
  })
})