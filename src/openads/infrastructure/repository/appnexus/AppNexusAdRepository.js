import AdRepository from '../../../domain/ad/AdRepository'

export default class AppNexusAdRepository extends AdRepository {
    /**
     *
     * @param {AppNexusConnector} appNexusConnector
     * @param {AppNexusResultMapper} appNexusResultMapper
     */
  constructor ({appNexusConnector, appNexusResultMapper}) {
    super()
    this._connector = appNexusConnector
    this._appNexusResultMapper = appNexusResultMapper
  }

  /**
   *
   * @param adRequest
   * @return {Promise<Ad>}
   */
  findAd ({adRequest}) {
    return new Promise((resolve, reject) => {
      if (adRequest.position.includes('NATIVE')) {
        resolve(this._appNexusResultMapper.mapResponseToDomain({
          position: adRequest.position,
          appNexusResponse: {
            'adType': 'native',
            'source': 'rtb',
            'native': {
              'title': 'Hardcoding Creativities for OpenAds',
              'body': 'The better option is to get it from the AdServer but we need now to develop the render capability until requesting is complete',
              'icon': {
                'width': 50,
                'height': 50,
                'url': 'https://s.dcdn.es.s3.amazonaws.com/mightyducks/test-images/50x50.png'
              },
              'image': {
                'width': 300,
                'height': 300,
                'url': 'https://s.dcdn.es.s3.amazonaws.com/mightyducks/test-images/300x300.png'
              },
              'cta': 'Give me a Click',
              'sponsoredBy': 'The Mighty Ducks',
              'impressionTrackers': [
                'https://s.dcdn.es.s3.amazonaws.com/mightyducks/test-images/1x1.000.png'
              ],
              'clickTrackers': [
                'https://s.dcdn.es.s3.amazonaws.com/mightyducks/test-images/1x1-f00.png'
              ],
              'clickUrl': 'https://github.com/scm-spain/OpenAds',
              'clickFallbackUrl': ''
            }
          }
        }))
      } else {
        this._connector
              .onEvent({
                event: 'adAvailable',
                targetId: adRequest.containerId,
                callback: (adRetrieved) => resolve(this._appNexusResultMapper.mapResponseToDomain({
                  position: adRequest.position,
                  appNexusResponse: adRetrieved
                }))
              })
              .onEvent({
                event: 'adBadRequest',
                targetId: adRequest.containerId,
                callback: (data) => {
                  reject(data)
                }
              })
              .defineTag({
                member: this._connector.member,
                targetId: adRequest.containerId,
                invCode: adRequest.placement,
                sizes: adRequest.sizes,
                keywords: adRequest.segmentation
              })
              .loadTags()
      }
    })
  }

  reset () {
    this._connector.reset()
  }
}
