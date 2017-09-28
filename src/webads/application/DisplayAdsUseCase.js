export default class DisplayAdsUseCase {
  /**
   *
   * @param {AdRepository} repository
   * @param {AdRenderer} adRenderer
   */
  constructor ({repository, adRenderer}) {
    this._repository = repository
    this._adRenderer = adRenderer
  }

  displayAds ({segmentation}) {
    /* const ads = this._repository.findAdsBySegmentation({segmentation})
    this._adRenderer.render({ads}) */
    this._adRenderer.render({})
    return 'Ragnadasdasdasdasdasrök'
  }
}
