import DomainEventBus from '../service/DomainEventBus'
import {pagePositionAdded} from './pagePositionAdded'
import {pageCreated} from './pageCreated'
import {pageSegmentationChanged} from './pageSegmentationChanged'

export default class Page {
  constructor ({id, segmentation, positions}) {
    this._id = id
    this._segmentation = segmentation
    this._positions = positions.map(positionDTO => new Position({
      id: new PositionId({
        pageId: this._id,
        domId: positionDTO.domId
      }),
      domId: positionDTO.domId,
      name: positionDTO.name,
      source: positionDTO.source,
      placement: positionDTO.placement,
      segmentation: positionDTO.segmentation,
      sizes: positionDTO.sizes,
      native: positionDTO.native
    }))
    DomainEventBus.raise({domainEvent: pageCreated({
      id: this._id,
      segmentation: this._segmentation,
      positions: this._positions
    })})
  }

  addPosition ({domId, name, source, placement, segmentation, sizes, native}) {
    const positionId = new PositionId({
      pageId: this._id,
      domId: domId
    })
    this._positions.push(new Position({
      id: positionId,
      domId,
      name,
      source,
      placement,
      segmentation,
      sizes,
      native
    }))
    DomainEventBus.raise({domainEvent: pagePositionAdded({
      id: positionId,
      domId,
      name,
      source,
      placement,
      segmentation,
      sizes,
      native
    })})
  }

  changeSegmentation ({segmentation}) {
    this._segmentation = segmentation
    DomainEventBus.raise({domainEvent: pageSegmentationChanged({
      id: this._id,
      segmentation: this._segmentation,
      positions: this._positions
    })})
  }
  refreshPage () {}
}

class Position {
  constructor ({ id, domId, name, source, placement, segmentation, sizes, native } = {}) {
    this._id = id
    this._domId = domId
    this._name = name
    this._source = source
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes
    this._native = native
  }
}

class PositionId {
  constructor ({pageId, domId}) {
    this._id = pageId + '_' + domId
  }

  get id () {
    return this._id
  }
}
