export default class WebAds {
  constructor ({container}) {
    this._container = container
  }

  displayAdsUseCase () {
    return this._container.buildDisplayAdsUseCase()
  }

  environment () {
    return this._container.config
  }
}
