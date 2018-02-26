import {POSITION_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {AD_AVAILABLE} from '../../infrastructure/connector/appnexus/event/events'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import PositionAdIsNativeError from '../../domain/position/PositionAdIsNativeError'
import {NATIVE} from '../../domain/value-objects/AdTypes'
import PositionResponse from './dto/PositionResponse'

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
      .then(savedPosition => savedPosition.ad.then(ad => PositionResponse.createFromPosition({position: savedPosition, ad})))
  }

  _filterPositionExists (optionalPositionWithId) {
    if (!optionalPositionWithId.position) {
      throw new PositionNotFoundException({id: optionalPositionWithId.id})
    }
    return optionalPositionWithId.position
  }

  _filterPositionAdAvailable (position) {
    return position.ad
      .then(adResponse => adResponse.status)
      .then(status => AD_AVAILABLE === status)
      .then(available => available ? position : Promise.reject(new PositionAdNotAvailableError({id: position.id})))
  }

  _filterPositionAdNoNative (position) {
    return position.ad
      .then(adResponse => adResponse.data.adType)
      .then(adType => adType === NATIVE)
      .then(isNative => isNative ? Promise.reject(new PositionAdIsNativeError({id: position.id})) : position)
  }
}
