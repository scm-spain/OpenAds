export default class OpenAds {
  /**
   *
   * @param {Container} container
   */
  constructor ({container}) {
    this._container = container
  }

  createPage ({id, segmentation, positions}) {
    return this._container.getInstance({key: 'CreatePageUseCase'}).createPage({id, segmentation, positions})
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
