export default class FindAdUseCase {
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
  find ({adRequest}) {
    return this._adChainedRepository.findAd({adRequest})
  }
}
