import {POSITION_VISIBLE} from '../../domain/position/positionStatus'

export default class DisplayPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   */
  constructor ({positionRepository}) {
    this._positionRepository = positionRepository
  }

  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */
  displayPosition ({id} = {}) {
    return this._positionRepository.find({id})
      .then(this._resolveOptionalPosition)
      .then(foundPosition => foundPosition.changeStatus({newStatus: POSITION_VISIBLE}))
      .then(modifiedPosition => this._positionRepository.save({position: modifiedPosition}))
  }

  _resolveOptionalPosition (optionalPosition) {
    if (optionalPosition === null) {
      throw new Error('PositionNotFound')
    }
    return optionalPosition
  }
}
