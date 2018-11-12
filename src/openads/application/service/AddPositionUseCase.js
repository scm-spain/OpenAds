import PositionAlreadyExists from '../../domain/position/PositionAlreadyExists'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import {AD_AVAILABLE, AD_ERROR} from '../../domain/ad/adStatus'
import PositionAdError from '../../domain/position/PositionAdError'

export default class AddPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {PositionFactory} positionFactory
   * @param {AdConnectorManager} adConnectorManager
   */
  constructor({positionRepository, positionFactory, adConnectorManager}) {
    this._positionRepository = positionRepository
    this._positionFactory = positionFactory
    this._adConnectorManager = adConnectorManager
  }
  /**
   * Create a new Position on the page
   * @param {string} id - position unique identifier
   * @param {string} name - position name
   * @param {Object} specification - connector specific data that defines the position
   * @param {string} specification.source - connector source
   * @returns {Promise<Position>}
   */
  addPosition({id, name, specification}) {
    return this._positionRepository
      .find({id})
      .then(this._filterPositionAlreadyExists)
      .then(() =>
        this._positionFactory.create({
          id,
          name,
          specification
        })
      )
      .then(createdPosition => this._setAdToPosition(createdPosition))
      .then(positionWithAd =>
        this._positionRepository.saveOrUpdate({position: positionWithAd})
      )
      .then(this._filterPositionAdIsAvailable)
  }

  _setAdToPosition(position) {
    return Promise.resolve()
      .then(() =>
        this._adConnectorManager.getConnector({
          source: position.specification.source
        })
      )
      .then(connector =>
        connector.loadAd({
          id: position.id,
          specification: position.specification
        })
      )
      .catch(error => ({
        data: error.stack || error.message,
        status: error.status || AD_ERROR
      }))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAlreadyExists(optionalPosition) {
    if (optionalPosition) {
      throw new PositionAlreadyExists({position: optionalPosition})
    }
    return optionalPosition
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
