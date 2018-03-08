import { appTitle } from '../../src/scripts/config'
import { shorthenText, setDocumentTitle } from '../../src/scripts/helpers'

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
})
