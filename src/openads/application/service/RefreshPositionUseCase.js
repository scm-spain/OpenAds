import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {AD_AVAILABLE} from '../../domain/ad/adStatus'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import PositionAdError from '../../domain/position/PositionAdError'

export default class RefreshPositionUseCase {
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {PositionRepository} positionRepository
   * @param {AdConnectorManager} adConnectorManager
   */
  constructor({positionRepository, adConnectorManager}) {
    this._positionRepository = positionRepository
    this._adConnectorManager = adConnectorManager
  }
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {string} id
   * @param {object} specification
   * @returns {Promise<Position>}
   */
  refreshPosition({id, specification}) {
    return this._positionRepository
      .find({id})
      .then(optionalPosition => ({id, position: optionalPosition}))
      .then(this._filterPositionExists)
      .then(positionToBeUpdated => positionToBeUpdated.update({specification}))
      .then(changedPosition => this._setAdToPosition(changedPosition))
      .then(positionWithAd =>
        this._positionRepository.saveOrUpdate({position: positionWithAd})
      )
      .then(this._filterPositionAdIsAvailable)
  }

  _filterPositionExists(optionalPositionWithId) {
    if (!optionalPositionWithId.position) {
      throw new PositionNotFoundException({id: optionalPositionWithId.id})
    }
    return optionalPositionWithId.position
  }
  _setAdToPosition(position) {
    return Promise.resolve()
      .then(() =>
        this._adConnectorManager.getConnector({
          source: position.specification.source
        })
      )
      .then(connector =>
        connector.refresh({
          id: position.id,
          specification: position.specification
        })
      )
      .catch(error => ({data: error.cause, status: error.status}))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAdIsAvailable(position) {
    if (position.ad.status !== AD_AVAILABLE) {
      if (position.ad.data && position.ad.data.errMessage) {
        throw new PositionAdError({position})
      } else {
        throw new PositionAdNotAvailableError({position})
      }
    }
    return position
  }
}
