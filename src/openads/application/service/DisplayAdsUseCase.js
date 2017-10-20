import ConnectorService from '../../domain/service/ConnectorService'
import AdDefinitionService from '../../domain/service/AdDefinitionService'
import AdRequest from '../../domain/ad/AdRequest'

export default class DisplayAdsUseCase {
  /**
   *
   * @param {AdRepository} adChainedRepository
   */
  constructor ({adChainedRepository}) {
    this._adChainedRepository = adChainedRepository
  }

  /**
   *
   * @param {AdRequest} adRequest
   */
  display ({adRequest}) {
    return this._adChainedRepository.findAd({adRequest})
         .then(ad => ad.show())
  }
}
