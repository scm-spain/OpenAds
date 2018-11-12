import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from './positionStatus'
import {positionCreated} from './positionCreated'
import {positionAlreadyDisplayed} from './positionAlreadyDisplayed'
import {positionDisplayed} from './positionDisplayed'
import DomainEventBus from '../service/DomainEventBus'
import InvalidPositionStatusException from './InvalidPositionStatusException'
import InvalidPositionSpecificationError from './InvalidPositionSpecificationError'
import {positionUpdated} from './positionUpdated'

export default class Position {
  /**
   * Create a new Position
   * @param {string} id
   * @param {string} name
   * @param {Object} specification
   * @param {string} specification.source
   * @param {Ad} ad - ValueObject width data from the ad loaded in this position
   * @param {string} status - Status of the position
   * @returns {Position}
   */
  constructor({
    id,
    name,
    specification,
    ad,
    status = POSITION_NOT_VISIBLE
  } = {}) {
    checkSpecificationHasSource({specification})
    this._id = id
    this._name = name
    this._specification = specification
    this._status = status
    this._ad = ad

    DomainEventBus.raise({
      domainEvent: positionCreated({
        id: this._id,
        name: this._name,
        specification: this._specification,
        status: this._status
      })
    })
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get specification() {
    return this._specification
  }

  get status() {
    return this._status
  }

  get ad() {
    return this._ad
  }

  updateAd(value) {
    this._ad = value
    return this
  }

  /**
   * Changes the position status
   * @param {PositionStatus} newStatus
   * @return {Position}
   */
  changeStatus({newStatus}) {
    if (
      POSITION_VISIBLE === newStatus &&
      POSITION_NOT_VISIBLE === this._status
    ) {
      this._status = POSITION_VISIBLE
      DomainEventBus.raise({
        domainEvent: positionDisplayed({
          id: this._id,
          name: this._name,
          specification: this._specification,
          status: this._status
        })
      })
    } else if (
      POSITION_VISIBLE === newStatus &&
      POSITION_VISIBLE === this._status
    ) {
      this._status = POSITION_VISIBLE
      DomainEventBus.raise({
        domainEvent: positionAlreadyDisplayed({
          id: this._id,
          name: this._name,
          specification: this._specification,
          status: this._status
        })
      })
    } else {
      throw new InvalidPositionStatusException({
        position: this,
        status: newStatus
      })
    }
    return this
  }

  /**
   * Update Position with given changes
   * @param {object} specification
   * @returns {Position}
   */
  update({specification = this._specification} = {}) {
    checkSpecificationHasSource({specification})
    this._ad = undefined
    this._specification = specification

    DomainEventBus.raise({
      domainEvent: positionUpdated({
        id: this._id,
        name: this._name,
        specification: this._specification,
        status: this._status
      })
    })
    return this
  }
}
const checkSpecificationHasSource = ({specification}) => {
  if (!specification || !specification.source) {
    throw new InvalidPositionSpecificationError({
      message: "Position's specification source is required"
    })
  }
}
