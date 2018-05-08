import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {AD_AVAILABLE} from '../../domain/ad/adStatus'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import PositionAdIsNativeError from '../../domain/position/PositionAdIsNativeError'
import {NATIVE} from '../../domain/ad/AdTypes'

export default class DisplayPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {AdConnectorManager} adConnectorManager
   */
  constructor ({positionRepository, adConnectorManager}) {
    this._positionRepository = positionRepository
    this._adConnectorManager = adConnectorManager
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
      .then(foundPosition =>
        this._adConnectorManager.getConnector({source: foundPosition.source})
          .then(connector => (foundPosition.status === POSITION_NOT_VISIBLE) ? connector.display({id: foundPosition.id}) : connector.refresh({ids: [foundPosition.id]}))
          .then(() => foundPosition)
      )
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
