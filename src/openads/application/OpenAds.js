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

  /**
   *
   * @param {...Position} positions
   * @return {*}
   */
  addPositions (...positions) {
    return this._container.getInstance({key: 'AddPositionsUseCase'}).addPositions(...positions)
  }

  /**
   *
   * @param containerId
   * @param name
   * @param source
   * @param placement
   * @param segmentation
   * @param sizes
   * @param native
   * @return {*}
   */
  modifyPosition ({containerId, name, source, placement, segmentation, sizes, native}) {
    return this._container.getInstance({key: 'ModifyPositionUseCase'}).modifyPosition({containerId, name, source, placement, segmentation, sizes, native})
  }

  /**
   *
   * @param {...Number} containerIds
   * @return {*}
   */
  displayPositions (...containerIds) {
    return this._container.getInstance({key: 'DisplayPositionsUseCase'}).displayPositions(...containerIds)
  }

  registerHook ({eventName, position, callback}) {
    this._container.getInstance({key: 'EventDispatcher'}).addObserver({
      eventName,
      position,
      observer: callback
    })
  }

  unregisterHook ({eventName, position, callback}) {
    this._container.getInstance({key: 'EventDispatcher'}).removeObserver({
      eventName,
      position,
      observer: callback
    })
  }

  environment () {
    return this._container.config
  }
}
