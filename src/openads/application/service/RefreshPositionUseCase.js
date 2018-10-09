import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {AD_AVAILABLE} from '../../domain/ad/adStatus'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'

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
   * @param {object} position
   * @param {string} position.name
   * @param {string} position.placement
   * @param {string} position.segmentation
   * @param {Array} position.sizes
   * @returns {Promise<Position>}
   */
  refreshPosition({id, position}) {
    return this._positionRepository
      .find({id})
      .then(optionalPosition => ({id, position: optionalPosition}))
      .then(this._filterPositionExists)
      .then(positionToBeUpdated =>
        positionToBeUpdated.changeSegmentation({...position})
      )
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
        this._adConnectorManager.getConnector({source: position.source})
      )
      .then(connector =>
        connector.refresh({
          domElementId: position.id,
          placement: position.placement,
          sizes: position.sizes,
          segmentation: position.segmentation,
          native: position.native
        })
      )
      .catch(error => ({data: error.cause, status: error.status}))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAdIsAvailable(position) {
    if (position.ad.status !== AD_AVAILABLE) {
      throw new PositionAdNotAvailableError({position})
    }
    return position
  }
}
