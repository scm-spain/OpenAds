import AdRepository from '../../../domain/ad/AdRepository'

export default class AppNexusAdRepository extends AdRepository {
  /**
     *
     * @param {AppNexusConnector} appNexusConnector
     * @param {AppNexusResultMapper} appNexusResultMapper
     * @param {AppNexusRequestMapper} appNexusRequestMapper
     */
  constructor ({appNexusConnector, appNexusResultMapper, appNexusRequestMapper}) {
    super()
    this._connector = appNexusConnector
    this._appNexusResultMapper = appNexusResultMapper
    this._appNexusRequestMapper = appNexusRequestMapper
  }

  /**
   *
   * @param adRequest
   * @return {Promise<Ad>}
   */
  findAd ({adRequest}) {
    return new Promise((resolve, reject) => {
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
        .onEvent({
          event: 'adError',
          targetId: adRequest.containerId,
          callback: (data) => {
            reject(data)
          }
        })
        .onEvent({
          event: 'adNoBid',
          targetId: adRequest.containerId,
          callback: (data) => {
            reject(data)
          }
        })
        .onEvent({
          event: 'adRequestFailure',
          targetId: adRequest.containerId,
          callback: (data) => {
            reject(data)
          }
        })
        .defineTag(this._appNexusRequestMapper.mapDomainToRequest({
          member: this._connector.member,
          targetId: adRequest.containerId,
          invCode: adRequest.placement,
          sizes: adRequest.sizes,
          keywords: adRequest.segmentation,
          native: adRequest.native
        }))
        .loadTags()
    })
  }

  reset () {
    return Promise.resolve()
      .then(() => this._connector.reset())
  }
}
