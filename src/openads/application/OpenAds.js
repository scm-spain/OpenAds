export default class OpenAds {
  constructor ({container}) {
    this._container = container
  }

  displayAdsUseCase () {
    return this._container.getInstance({key: 'DisplayAdsUseCase'})
  }

  environment () {
    return this._container.config
  }
}
