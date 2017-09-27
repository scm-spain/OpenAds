export default class DisplayAdsUseCase {
  constructor ({repository, adRenderer}) {
    this._repository = repository
    this._adRenderer = adRenderer
  }

  displayAds ({segmentation}) {
    /* const ads = this._repository.findAdsBySegmentation({segmentation})
    this._adRenderer.render({ads}) */
    return 'Ragnarök'
  }
}
