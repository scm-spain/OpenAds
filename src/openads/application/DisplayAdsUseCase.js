export default class DisplayAdsUseCase {
  /**
   *
   * @param {AdRepositoryResolver} adRepositoryResolver
   */
  constructor ({adRepositoryResolver, adDefinitionsCatalog}) {
    this._adRepositoryResolver = adRepositoryResolver
    this._adDefinitionsCatalog = adDefinitionsCatalog
  }

  displayAds ({target, ad, segmentation}) {
    const adDefinition = this._adDefinitionsCatalog.ad({code: ad})
    const adRepository = this._adRepositoryResolver.adRepository({source: adDefinition.source})
    adRepository.findAd({
      target,
      ad: adDefinition,
      segmentation
    })
  }
}
