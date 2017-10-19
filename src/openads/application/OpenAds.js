export default class OpenAds {
  constructor ({container}) {
    this._container = container
  }

  findAdsUseCase () {
    return this._container.getInstance({key: 'FindAdsUseCase'})
  }

  displayAdsUseCase () {
    return this._container.getInstance({key: 'DisplayAdsUseCase'})
  }

  environment () {
    return this._container.config
  }
}
