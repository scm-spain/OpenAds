export default class OpenAds {
  /**
   *
   * @param {Container} container
   */
  constructor({container}) {
    this._container = container
  }

  /**
   * Create a new Position on the page
   * @param {string} id - the Ad unique identifier
   * @param {string} name - the position name
   * @param {Object} specification - Ad's connector specific data required to load it
   * @returns {Promise} Promise object representing when the operation finish
   */
  addPosition({id, name, specification}) {
    return this._container
      .getInstance({key: 'AddPositionUseCase'})
      .addPosition({id, name, specification})
  }

  /**
   * Update a Position with given changes and refresh his Ad
   * @param {string} id - the Ad unique identifier
   * @param {Object} specification - Ad's connector specific data to be updated
   * @returns {Promise} Promise object representing when the operation finish
   */
  refreshPosition({id, specification}) {
    return this._container
      .getInstance({key: 'RefreshPositionUseCase'})
      .refreshPosition({id, specification})
  }

  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */
  displayPosition({id} = {}) {
    return this._container
      .getInstance({key: 'DisplayPositionUseCase'})
      .displayPosition({id})
  }

  /**
   * Indicates if a position has been previously added
   * @param id
   */
  hasPosition({id}) {
    return this._container
      .getInstance({key: 'HasPositionUseCase'})
      .hasPosition({id})
  }

  /**
   * Returns current configuration loaded
   * @returns {Object}
   */
  environment() {
    return this._container.config
  }
}
