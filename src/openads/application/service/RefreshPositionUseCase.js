import PositionNotFoundException from '../../domain/position/PositionNotFoundException'
import {POSITION_NOT_VISIBLE} from '../../domain/position/positionStatus'
import PositionNotVisibleException from '../../domain/position/PositionNotVisibleException'
import {AD_AVAILABLE} from '../../infrastructure/connector/appnexus/event/events'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'

export default class RefreshPositionUseCase {
  /**
   * Update a Position with given changes and refresh his Ad
   * @param {PositionRepository} positionRepository
   * @param {AdRepository} adRepository
   */
  constructor ({positionRepository, adRepository}) {
    this._positionRepository = positionRepository
    this._adRepository = adRepository
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
      .then(optionalPosition => ({id, position: optionalPosition}))
      .then(this._filterPositionExists)
      .then(this._filterPositionVisible)
      .then(visiblePosition => this._setAdFetchWorkInProgress(visiblePosition))
      .then(positionToBeUpdated => positionToBeUpdated.changeSegmentation({...position}))
      .then(changedPosition => this._setAdToPosition(changedPosition))
      .then(positionWithAd => this._positionRepository.saveOrUpdate({position: positionWithAd}))
      .then(this._filterPositionAdIsAvailable)
  }

  _filterPositionExists (optionalPositionWithId) {
    if (!optionalPositionWithId.position) {
      throw new PositionNotFoundException({id: optionalPositionWithId.id})
    }
    return optionalPositionWithId.position
  }

  _filterPositionVisible (position) {
    if (POSITION_NOT_VISIBLE === position.status) {
      throw new PositionNotVisibleException({position})
    }
    return position
  }

  _setAdFetchWorkInProgress (position) {
    this._adRepository.remove({id: position.id})
    return position
  }

  _setAdToPosition (position) {
    return this._adRepository.find({id: position.id})
      .catch(error => ({data: error.cause, status: error.status}))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAdIsAvailable (position) {
    if (position.ad.status !== AD_AVAILABLE) {
      throw new PositionAdNotAvailableError({position})
    }
    return position
  }
}
