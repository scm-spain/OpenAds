import DomainEventBus from '../service/DomainEventBus'
import {pagePositionAdded, positionAdded} from './positionAdded'
import {pageCreated} from './pageCreated'
import {pageSegmentationChanged} from './pageSegmentationChanged'
import {POSITION_NOT_VISIBLE} from './positionStatus'

export default class Position {
  constructor ({domId, name, source, placement, segmentation, sizes, native}) {
    this._id = domId
    this._name = name
    this._source = source
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes
    this._native = native
    this._status = POSITION_NOT_VISIBLE

    DomainEventBus.raise({domainEvent: positionAdded({
      id: this._id,
      name: this._name,
      source: this._source,
      placement: this._placement,
      segmentation: this._segmentation,
      sizes: this._sizes,
      native: this._native,
      status: this._status
    })})
  }
}
