import AdRepository from '../../domain/ad/AdRepository'

export default class AppNexusAdRepository extends AdRepository {
  constructor ({appNexusClient}) {
    super()
    this._appNexusClient = appNexusClient
  }

  findAdsBySegmentation ({segmentation}) {
    // Prove of concept based on legacy code using apntag
    return this._appNexusClient.requests.tags[segmentation].adResponse.ads
  }
}
