export default class OpenAds {
  constructor ({container}) {
    this._container = container
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
  find ({adRequest}) {
    return this._container.getInstance({key: 'FindAdsUseCase'}).find({adRequest})
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
    return this._container.getInstance({key: 'DisplayAdsUseCase'}).display({adRequest})
  }

  environment () {
    return this._container.config
  }
}
