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
   * @param {string} adRequest.position - Position where Ad will be displayed
   * @param {string} adRequest.containerId - DOM element where Ad will be rendered
   * @param {string} adRequest.segmentation - Segmentation to target the Ad
   * @param {string} adRequest.placement - Placement to target the Ad
   * @param {Array<Size>} adRequest.sizes - Collection of sizes accepted for given targeting segmentation
   */
  display ({adRequest}) {
    return this._adChainedRepository.findAd({adRequest})
         .then(ad => ad.show())
  }
}
