import PositionAlreadyExists from '../../domain/position/PositionAlreadyExists'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import {AD_AVAILABLE} from '../../infrastructure/connector/appnexus/event/events'

export default class AddPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {PositionFactory} positionFactory
   * @param {AdRepository} adRepository
   */
  constructor ({positionRepository, positionFactory, adRepository}) {
    this._positionRepository = positionRepository
    this._positionFactory = positionFactory
    this._adRepository = adRepository
  }
  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native
   * @param {Function} native.renderer - The function to be used when display use case is used in this position and the Ad is Native type
   * @param {Object} native.fields - Fields requested to the ad server
   * @param {string} native.domClickableId - DOM id where will be included the clickable action from native
   * @returns {Promise<Position>}
   */
  addPosition ({id, name, source, placement, segmentation, sizes, native}) {
    return this._positionRepository.find({id})
      .then(this._filterPositionAlreadyExists)
      .then(() => this._positionFactory.create({id, name, source, placement, segmentation, sizes, native}))
      // .then(this._setAdToPosition) // todo why this line fails ¿? the line below is working fine insted
      .then(createdPosition => this._setAdToPosition({position: createdPosition}))
      .then(positionWithAd => this._positionRepository.saveOrUpdate({position: positionWithAd}))
      .then(this._filterPositionAdIsAvailable)
  }

  _setAdToPosition ({position}) {
    return this._adRepository.find({id: position.id})
      .catch(error => ({data: error.cause, status: error.status}))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAlreadyExists (optionalPosition) {
    if (optionalPosition) {
      throw new PositionAlreadyExists({id: optionalPosition.id})
    }
    return optionalPosition
  }

  _filterPositionAdIsAvailable (position) {
    if (position.ad.status !== AD_AVAILABLE) {
      throw new PositionAdNotAvailableError({position})
    }
    return position
  }
}
