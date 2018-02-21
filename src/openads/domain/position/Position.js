import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from './positionStatus'
import {positionCreated} from './positionCreated'
import {positionAlreadyDisplayed} from './positionAlreadyDisplayed'
import {positionDisplayed} from './positionDisplayed'
import DomainEventBus from '../service/DomainEventBus'
import {positionSegmentationChanged} from './positionSegmentationChanged'
import InvalidPositionStatusException from './InvalidPositionStatusException'

export default class Position {
  /**
   * Create a new Position
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
   * @param {Ad} ad - ValueObject width data from the ad loaded in this position
   * @param {string} status - Status of the position
   * @returns {Position}
   */
  constructor ({id, name, source, placement, segmentation, sizes, native, ad, status = POSITION_NOT_VISIBLE} = {}) {
    this._id = id
    this._name = name
    this._source = source
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes
    this._native = native
    this._status = status
    this._ad = ad

    DomainEventBus.raise({
      domainEvent: positionCreated({
        id: this._id,
        name: this._name,
        source: this._source,
        placement: this._placement,
        segmentation: this._segmentation,
        sizes: this._sizes,
        native: this._native,
        status: this._status
      })
    })
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get source () {
    return this._source
  }

  get placement () {
    return this._placement
  }

  get segmentation () {
    return this._segmentation
  }

  get sizes () {
    return this._sizes
  }

  get native () {
    return this._native
  }

  get status () {
    return this._status
  }

  get ad () {
    return this._ad
  }

  set ad (value) {
    this._ad = value
  }

  /**
   * Changes the position status
   * @param {PositionStatus} newStatus
   * @return {Position}
   */
  changeStatus ({newStatus}) {
    if (POSITION_VISIBLE === newStatus && POSITION_NOT_VISIBLE === this._status) {
      this._status = POSITION_VISIBLE
      DomainEventBus.raise({domainEvent: positionDisplayed({
        id: this._id,
        name: this._name,
        source: this._source,
        placement: this._placement,
        segmentation: this._segmentation,
        sizes: this._sizes,
        native: this._native,
        status: this._status
      })})
    } else if (POSITION_VISIBLE === newStatus && POSITION_VISIBLE === this._status) {
      this._status = POSITION_VISIBLE
      DomainEventBus.raise({domainEvent: positionAlreadyDisplayed({
        id: this._id,
        name: this._name,
        source: this._source,
        placement: this._placement,
        segmentation: this._segmentation,
        sizes: this._sizes,
        native: this._native,
        status: this._status
      })})
    } else {
      throw new InvalidPositionStatusException({status: newStatus})
    }
    return this
  }

  /**
   * Update Position with given changes
   * @param {{name: *, placement: *}} position
   * @param {string} position.name
   * @param {string} position.placement
   * @param {string} position.segmentation
   * @param {Array} position.sizes
   * @returns {Position}
   */
  changeSegmentation ({ name = this._name, placement = this._placement, segmentation = this._segmentation, sizes = this._sizes } = {}) {
    this._ad = undefined
    this._name = name
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes

    DomainEventBus.raise({
      domainEvent: positionSegmentationChanged({
        id: this._id,
        name: this._name,
        source: this._source,
        placement: this._placement,
        segmentation: this._segmentation,
        sizes: this._sizes,
        native: this._native,
        status: this._status
      })
    })
    return this
  }
}
