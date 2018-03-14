import { AxiosYoutubeSearch } from '../../src/scripts/helpers/async-promises'
import { youtubeApiKey } from '../../src/scripts/config'

describe('Async Promise Helpers', () => {
  it('adds pageToken property into axiosConfig object in AxiosYoutubeSearch if props is not defined', () => {
    const promise = new AxiosYoutubeSearch(undefined, undefined)
    expect(promise.q).toEqual(null)
    expect(promise.pageToken).toEqual(null)
  })

  it('adds pageToken property into axiosConfig object in AxiosYoutubeSearch if pageToken is defined', () => {
    const defaults = {
      params: {
        part: 'snippet',
        q: 'abc',
        type: 'video',
        maxResults: 24,
        pageToken: 'pageToken',
        key: youtubeApiKey
      }
    }
    const promise = new AxiosYoutubeSearch(defaults.params.q, defaults.params.pageToken)
    expect(promise.axiosConfig()).toEqual(defaults)
  })
})
