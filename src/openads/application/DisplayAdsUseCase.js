export default class DisplayAdsUseCase {
  /**
   *
   * @param {AdRepositoryResolver} adRepositoryResolver
   */
  constructor ({adRepositoryResolver}) {
    this._adRepositoryResolver = adRepositoryResolver
  }

  displayAds ({target, ad, segmentation}) {
    this._adRepositoryResolver
        .adRepository({source: ad.source})
        .findAd({target, ad, segmentation})
  }
}
