import { shorthenText } from '../../src/scripts/helpers'

describe('Helpers', () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui libero, sit amet facilisis urna iaculis ac. Nulla vehicula magna pulvinar dolor placerat, eget consectetur purus porttitor. Nunc arcu quam, ornare sit amet ultrices ac, cursus pellentesque tortor.`

  it('calls renderDescription function when maxLenght is not defined', () => {
    const descStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui libero, sit amet faci...'
    expect(shorthenText(description)).toEqual(descStr)
  })

  it('calls renderDescription function when maxLenght is 80', () => {
    const descStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus dui l...'
    expect(shorthenText(description, 80)).toEqual(descStr)
  })
})