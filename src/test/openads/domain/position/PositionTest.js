import {expect} from 'chai'
import Position from '../../../../openads/domain/position/Position'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import {POSITION_CREATED} from '../../../../openads/domain/position/positionCreated'
import {POSITION_SEGMENTATION_CHANGED} from '../../../../openads/domain/position/positionSegmentationChanged'

describe('Position', () => {
  it('Should create a Domain Position and raise an event', () => {
    DomainEventBus.register({
      eventName: POSITION_CREATED,
      observer: ({payload, dispatcher}) => expect(payload.id).to.be.equal('top1')
    })
    const givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      source: 'appnexus',
      placement: 'lalala',
      segmentation: 'idkfa&iddqd',
      sizes: [],
      native: {}
    })
    expect(givenPosition.segmentation, 'Tricks for DOOM!!').to.be.equal('idkfa&iddqd')
  })

  it('Should update the position with new segmentation data and raise an event', () => {
    DomainEventBus.register({
      eventName: POSITION_SEGMENTATION_CHANGED,
      observer: ({payload, dispatcher}) => {
        expect(payload.id).to.be.equal('top1')
        expect(payload.segmentation).to.be.equal('godmode=true')
      }
    })
    let givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      source: 'appnexus',
      placement: 'lalala',
      segmentation: 'idkfa&iddqd',
      sizes: [],
      native: {}
    })
    let updatedPosition = givenPosition.changeSegmentation({
      segmentation: 'godmode=true'
    })
    expect(updatedPosition.segmentation, 'Tricks for DOOM!!').to.be.equal('godmode=true')
  })

  it('Shouldn\'t update any field of the position', () => {
    DomainEventBus.register({
      eventName: POSITION_SEGMENTATION_CHANGED,
      observer: ({payload, dispatcher}) => {
        expect(payload.id).to.be.equal('top1')
        expect(payload.segmentation).to.be.equal('idkfa&iddqd')
      }
    })
    let givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      source: 'appnexus',
      placement: 'lalala',
      segmentation: 'idkfa&iddqd',
      sizes: [],
      native: {}
    })
    let updatedPosition = givenPosition.changeSegmentation()
    expect(updatedPosition.segmentation, 'Tricks for DOOM!!').to.be.equal('idkfa&iddqd')
  })
})
