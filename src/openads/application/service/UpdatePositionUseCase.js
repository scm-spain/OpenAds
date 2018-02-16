export default class UpdatePositionUseCase {
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {PositionRepository} positionRepository
   */
  constructor ({positionRepository}) {
    this._positionRepository = positionRepository
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
  updatePosition ({id, position}) {
    return this._positionRepository.find({id})
      .then(position => position.changeSegmentation({...position}))
      .then(positionUpdated => this._positionRepository.update({position: positionUpdated}))
  }
}
