import {POSITION_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotFoundException from '../../domain/position/PositionNotFoundException'

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
  displayPosition ({id}) {
    return this._positionRepository.find({id})
      .then(optionalPosition => this._resolveOptionalPosition({optionalPosition, id}))
      .then(foundPosition => foundPosition.changeStatus({newStatus: POSITION_VISIBLE}))
      .then(modifiedPosition => this._positionRepository.save({position: modifiedPosition}))
  }

  _resolveOptionalPosition ({optionalPosition, id}) {
    if (optionalPosition === null) {
      throw new PositionNotFoundException({id: id})
    }
    return optionalPosition
  }
}
