export default class OpenAds {
  /**
   *
   * @param {Container} container
   */
  constructor ({container}) {
    this._container = container
  }
  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native - Fields requested to the ad server
   * @returns {Promise<Position>}
   */
  addPosition ({id, name, source, placement, segmentation, sizes, native}) {
    return this._container.getInstance({key: 'AddPositionUseCase'}).addPosition({id, name, source, placement, segmentation, sizes, native})
  }

  /**
   * Update a Position with given changes and refresh his Ad
   * @param {string} id
   * @param {object} position
   * @param {string} position.name
   * @param {string} position.placement
   * @param {string} position.segmentation
   * @param {Array} position.sizes
   * @returns {Promise<Position>}
   */
  refreshPosition ({id, position}) {
    return this._container.getInstance({key: 'RefreshPositionUseCase'}).refreshPosition({id, position})
  }
  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */
  displayPosition ({id} = {}) {
    return this._container.getInstance({key: 'DisplayPositionUseCase'}).displayPosition({id})
  }

  /**
   * Returns current configuration loaded
   * @returns {Object}
   */
  environment () {
    return this._container.config
  }
}
