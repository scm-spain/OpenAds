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
      this._connector.activateDebugMode()

      this._connector.setPageOpts({
        member: this._connector.member,
        keywords: adRequest.segmentation
      })
      this._connector.onEvent({
        event: 'adAvailable',
        targetId: adRequest.containerId,
        callback: (adRetrieved) => resolve(this._appNexusResultMapper.mapResponseToDomain({appNexusResponse: adRetrieved}))
      })
      this._connector.onEvent({
        event: 'adBadRequest',
        targetId: adRequest.containerId,
        callback: (data) => {
          reject(data)
        }
      })
      this._connector.defineTag({
        invCode: adRequest.placement,
        sizes: adRequest.sizes,
        targetId: adRequest.containerId
      })

      this._connector.loadTags()
    })
  }
}
