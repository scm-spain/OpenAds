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
      this._connector
        .activateDebugMode()
        .setPageOpts({
          member: this._connector.member,
          keywords: adRequest.segmentation
        })
        .onEvent({
          event: 'adAvailable',
          targetId: adRequest.containerId,
          callback: (adRetrieved) => resolve(this._appNexusResultMapper.mapResponseToDomain({appNexusResponse: adRetrieved}))
        })
        .onEvent({
          event: 'adBadRequest',
          targetId: adRequest.containerId,
          callback: (data) => {
            reject(data)
          }
        })
        .defineTag({
          invCode: adRequest.placement,
          sizes: adRequest.sizes,
          targetId: adRequest.containerId
        })
        .loadTags()
    })
  }
}
