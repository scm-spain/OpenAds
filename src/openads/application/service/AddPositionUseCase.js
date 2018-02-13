export default class AddPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {PositionFactory} positionFactory
   */
  constructor ({positionRepository, positionFactory}) {
    this._positionRepository = positionRepository
    this._positionFactory = positionFactory
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
    return Promise.resolve()
      .then(() => this._positionFactory.create({id, name, source, placement, segmentation, sizes, native}))
      .then(position => this._positionRepository.save({position}))
  }
}
