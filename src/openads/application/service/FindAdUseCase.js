export default class FindAdUseCase {
  /**
   *
   * @param {AdRepository} adChainedRepository
   */
  constructor ({adChainedRepository, logger}) {
    this._adChainedRepository = adChainedRepository
    this._logger = logger
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
    return Promise.resolve()
      .then(() => this._logger.info('Find Ad', '| adRequest:', adRequest))
      .then(() => this._adChainedRepository.findAd({adRequest}))
  }
}
