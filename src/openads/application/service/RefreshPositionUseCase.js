import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {POSITION_NOT_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotVisibleException from '../../domain/position/PositionNotVisibleException'

export default class RefreshPositionUseCase {
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
  refreshPosition ({id, position}) {
    return this._positionRepository.find({id})
      .then(optionalPosition => this._resolveOptionalPosition({optionalPosition, id}))
      .then(this._filterPositionVisible)
      .then(positionToBeUpdated => positionToBeUpdated.changeSegmentation({...position}))
      .then(positionUpdated => this._positionRepository.update({position: positionUpdated}))
  }
  _resolveOptionalPosition ({optionalPosition, id}) {
    if (!optionalPosition) {
      throw new PositionNotFoundException({id: id})
    }
    return optionalPosition
  }

  _filterPositionVisible (position) {
    if (POSITION_NOT_VISIBLE === position.status) {
      throw new PositionNotVisibleException({id: position.id})
    }
    return position
  }
}
