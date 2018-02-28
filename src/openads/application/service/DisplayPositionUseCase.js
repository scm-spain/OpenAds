import {POSITION_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {AD_AVAILABLE} from '../../infrastructure/connector/appnexus/event/events'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import PositionAdIsNativeError from '../../domain/position/PositionAdIsNativeError'
import {NATIVE} from '../../domain/value-objects/AdTypes'

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
      .then(optionalPosition => ({id, position: optionalPosition}))
      .then(this._filterPositionExists)
      .then(this._filterPositionAdAvailable)
      .then(this._filterPositionAdNoNative)
      .then(foundPosition => foundPosition.changeStatus({newStatus: POSITION_VISIBLE}))
      .then(modifiedPosition => this._positionRepository.saveOrUpdate({position: modifiedPosition}))
  }

  _filterPositionExists (optionalPositionWithId) {
    if (!optionalPositionWithId.position) {
      throw new PositionNotFoundException({id: optionalPositionWithId.id})
    }
    return optionalPositionWithId.position
  }

  _filterPositionAdAvailable (position) {
    return Promise.resolve(position.ad && position.ad.status)
      .then(status => AD_AVAILABLE === status)
      .then(available => available ? position : Promise.reject(new PositionAdNotAvailableError({position})))
  }

  _filterPositionAdNoNative (position) {
    return Promise.resolve(position.ad && position.ad.data && position.ad.data.adType)
      .then(adType => adType === NATIVE)
      .then(isNative => isNative ? Promise.reject(new PositionAdIsNativeError({position})) : position)
  }
}
