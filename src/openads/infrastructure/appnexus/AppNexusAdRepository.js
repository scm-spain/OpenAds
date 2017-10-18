import AdRepository from '../../domain/ad/AdRepository'

export default class AppNexusAdRepository extends AdRepository {
  constructor ({appNexusConnector}) {
    super()
    this._connector = appNexusConnector
  }
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
        callback: (data) => {
          console.log('CALLBACK', data)
          resolve(data)
        }
      })
      this._connector.onEvent({
        event: 'adBadRequest',
        targetId: adRequest.containerId,
        callback: (data) => {
          console.log('CALLBACK-adBadRequest', data)
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
