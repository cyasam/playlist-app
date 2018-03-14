import { appTitle } from '../../src/scripts/config'
import { shorthenText, setDocumentTitle, filterVideoDetailResult, ConvertYouTubeDuration } from '../../src/scripts/helpers'

describe('Helpers', () => {
  describe('setDocumentTitle helper', () => {
    it('returns appTitle if title is not defined', () => {
      const title = undefined
      expect(setDocumentTitle(title)).toEqual(appTitle)
    })

    it('returns a title', () => {
      const title = 'title'
      expect(setDocumentTitle(title)).toEqual(`${title} - ${appTitle}`)
    })
  })

  describe('shorthenText helper', () => {
    const setup = (description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui libero, sit amet facilisis urna iaculis ac. Nulla vehicula magna pulvinar dolor placerat, eget consectetur purus porttitor. Nunc arcu quam, ornare sit amet ultrices ac, cursus pellentesque tortor.`) => {
      return {
        description
      }
    }

    it('calls shorthenText function when maxLenght is not defined', () => {
      const { description } = setup()
      const descStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui libero, sit amet faci...'
      expect(shorthenText(description)).toEqual(descStr)
    })

    it('calls shorthenText function when maxLenght is not defined and description text length is less than 80', () => {
      const desc = 'Lorem ipsum dolor sit amet'
      const { description } = setup(desc)
      expect(shorthenText(description)).toEqual(desc)
    })

    it('calls shorthenText function when maxLenght is 80', () => {
      const { description } = setup()
      const descStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui l...'
      expect(shorthenText(description, 80)).toEqual(descStr)
    })

    it('calls shorthenText function when maxLenght is 80 and description text length is less than 80', () => {
      const desc = 'Lorem ipsum dolor sit amet'
      const { description } = setup(desc)
      expect(shorthenText(description, 80)).toEqual(desc)
    })
  })

  describe('filterVideoDetailResult helper', () => {
    it('returns empty object when items is empty', () => {
      expect(filterVideoDetailResult({ items: [] })).toEqual({})
    })
  })

  describe('ConvertYouTubeDuration helper', () => {
    const setup = (duration = 'PT2H8M24S') => {
      return new ConvertYouTubeDuration(duration)
    }

    it('returns duration if duration hour is bigger than 0', () => {
      const instance = setup()
      expect(instance.convert()).toEqual('2:08:24')
    })

    it('returns duration if duration second is less than 10', () => {
      const instance = setup('PT2H8M9S')
      expect(instance.convert()).toEqual('2:08:09')
    })

    it('returns duration if duration PT8M6S', () => {
      const instance = setup('PT8M6S')
      expect(instance.convert()).toEqual('8:06')
    })

    it('returns duration if duration PT12M10S', () => {
      const instance = setup('PT12M10S')
      expect(instance.getMinutes()).toEqual(12)
      expect(instance.convert()).toEqual('12:10')
    })

    it('returns duration if duration PT10S', () => {
      const instance = setup('PT10S')
      expect(instance.getMinutes()).toEqual(0)
      expect(instance.convert()).toEqual('0:10')
    })

    it('returns duration if duration PT0S', () => {
      const instance = setup('PT0S')
      expect(instance.getSeconds()).toEqual(0)
      expect(instance.convert()).toEqual('0:00')
    })
  })
})
