export default class OpenAds {
  /**
   *
   * @param {Container} container
   */
  constructor ({container}) {
    this._container = container
  }

  /**
   *
   * @param {AdRequest} adRequest
   * @param {string} adRequest.position - Position where Ad will be displayed
   * @param {string} adRequest.containerId - DOM element where Ad will be rendered
   * @param {string} adRequest.segmentation - Segmentation to target the Ad
   * @param {string} adRequest.placement - Placement to target the Ad
   * @param {Array<Size>} adRequest.sizes - Collection of sizes accepted for given targeting segmentation
   */
  find ({adRequest}) {
    return this._container.getInstance({key: 'FindAdsUseCase'}).find({adRequest})
  }
  /**
   *
   * @param {AdRequest} adRequest
   * @param {string} adRequest.position - Position where Ad will be displayed
   * @param {string} adRequest.containerId - DOM element where Ad will be rendered
   * @param {string} adRequest.segmentation - Segmentation to target the Ad
   * @param {string} adRequest.placement - Placement to target the Ad
   * @param {Array<Size>} adRequest.sizes - Collection of sizes accepted for given targeting segmentation
   */
  display ({adRequest}) {
    return this._container.getInstance({key: 'DisplayAdsUseCase'}).display({adRequest})
  }

  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native
   * @param {Function} native.renderer - The function to be used when display use case is used in this position and the Ad is Native type
   * @param {Object} native.fields - Fields requested to the ad server
   * @param {string} native.domClickableId - DOM id where will be included the clickable action from native
   * @returns {Promise<Position>}
   */
  addPosition ({id, name, source, placement, segmentation, sizes, native}) {
    return this._container.getInstance({key: 'AddPositionUseCase'}).addPosition({id, name, source, placement, segmentation, sizes, native})
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

  registerNativeRenderer ({position, renderer}) {
    this._container.getInstance({key: 'NativeRendererProcessor'}).addPositionRenderer({
      position,
      renderer: renderer
    })
  }

  unregisterNativeRenderer ({position}) {
    this._container.getInstance({key: 'NativeRendererProcessor'}).removePositionRenderer({
      position
    })
  }

  resetConnectors () {
    return this._container.getInstance({key: 'ResetConnectorsUseCase'}).resetConnectors()
  }

  environment () {
    return this._container.config
  }

  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */
  displayPosition ({id}) {
    return this._container.getInstance({key: 'DisplayPositionUseCase'}).displayPosition({id})
  }
}
