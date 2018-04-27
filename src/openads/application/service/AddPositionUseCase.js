import PositionAlreadyExists from '../../domain/position/PositionAlreadyExists'
import PositionAdNotAvailableError from '../../domain/position/PositionAdNotAvailableError'
import {AD_AVAILABLE, AD_ERROR} from '../../domain/ad/adStatus'

export default class AddPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   * @param {PositionFactory} positionFactory
   * @param {AdConnectorManager} adConnectorManager
   */
  constructor ({positionRepository, positionFactory, adConnectorManager}) {
    this._positionRepository = positionRepository
    this._positionFactory = positionFactory
    this._adConnectorManager = adConnectorManager
  }
  /**
   * Create a new Position on the page
   * @param {string} id
   * @param {string} name
   * @param {string} source
   * @param {string} placement
   * @param {string} segmentation
   * @param {Array<Array<>>}sizes
   * @param {Object} native - Fields requested to the ad server
   * @returns {Promise<Position>}
   */
  addPosition ({id, name, source, placement, segmentation, sizes, native}) {
    return this._positionRepository.find({id})
      .then(this._filterPositionAlreadyExists)
      .then(() => this._positionFactory.create({id, name, source, placement, segmentation, sizes, native}))
      .then(createdPosition => this._setAdToPosition(createdPosition))
      .then(positionWithAd => this._positionRepository.saveOrUpdate({position: positionWithAd}))
      .then(this._filterPositionAdIsAvailable)
  }

  _setAdToPosition (position) {
    return Promise.resolve()
      .then(() => this._adConnectorManager.getConnector({source: position.source}))
      .then(connector => connector.loadAd({
        domElementId: position.id,
        placement: position.placement,
        sizes: position.sizes,
        segmentation: position.segmentation,
        native: position.native
      }))
      .catch(error => ({
        data: error.stack || error.message,
        status: error.status || AD_ERROR
      }))
      .then(ad => position.updateAd(ad))
  }

  _filterPositionAlreadyExists (optionalPosition) {
    if (optionalPosition) {
      throw new PositionAlreadyExists({position: optionalPosition})
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
