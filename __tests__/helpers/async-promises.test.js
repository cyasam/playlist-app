import { AxiosYoutubeSearch } from '../../src/scripts/helpers/async-promises'
import { YOUTUBE_API_KEY } from '../../src/scripts/config'

describe('Async Promise Helpers', () => {
  it('adds pageToken property into axiosConfig object in AxiosYoutubeSearch if pageToken is defined', () => {
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
        regionCode: 'TR',
        maxResults: 24,
        pageToken: 'pageToken',
        key: YOUTUBE_API_KEY
      }
    }
    const promise = new AxiosYoutubeSearch(defaults.params.q, defaults.params.pageToken)
    expect(promise.axiosConfig()).toEqual(defaults)
  })
})