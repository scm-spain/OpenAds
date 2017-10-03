export default class OpenAds {
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
