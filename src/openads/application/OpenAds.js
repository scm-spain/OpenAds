export default class OpenAds {
  /**
   *
   * @param {Container} container
   */
  constructor ({container}) {
    this._container = container
  }

  addPosition ({domId, name, source, placement, segmentation, sizes, native}) {
    return this._container.getInstance({key: 'AddPositionUseCase'}).addPosition({domId, name, source, placement, segmentation, sizes, native})
  }

  registerHook ({eventName, position, callback}) {
    this._container.getInstance({key: 'EventDispatcher'}).addObserver({
      eventName,
      observer: callback
    })
  }

  clearAllHooks () {
    this._container.getInstance({key: 'EventDispatcher'}).clearAllObservers()
  }

  environment () {
    return this._container.config
  }
}
