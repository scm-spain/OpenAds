import Position from '../../../../openads/domain/position/Position'
import {expect} from 'chai'
import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import sinon from 'sinon'
import {POSITION_CREATED} from '../../../../openads/domain/position/positionCreated'
import {POSITION_SEGMENTATION_CHANGED} from '../../../../openads/domain/position/positionSegmentationChanged'

describe('Position', () => {
  beforeEach(() => {
    DomainEventBus.clearAllObservers()
  })
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
    const observerSpy = sinon.spy()

    DomainEventBus.register({
      eventName: POSITION_SEGMENTATION_CHANGED,
      observer: ({payload, dispatcher}) => {
        expect(payload.id).to.be.equal('top1')
        expect(payload.segmentation).to.be.equal('idkfa&iddqd')
        observerSpy()
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
    expect(observerSpy.calledOnce, 'observer should be called once').to.be.true
  })
  describe('changeStatus method', () => {
    describe('Given a valid input status', () => {
      it('Should change the position status and return the position with the changed status', (done) => {
        const position = new Position({status: POSITION_NOT_VISIBLE})
        const result = position.changeStatus({newStatus: POSITION_VISIBLE})
        expect(result.status).equal(POSITION_VISIBLE)
        done()
      })
      it('Should raise POSITION_DISPLAYED event when changing the position status from POSITION_NOT_VISIBLE to POSITION_VISIBLE', (done) => {
        const observer = {
          getObserverFunction: ({payload, dispatcher}) => { }
        }
        const observerSpy = sinon.spy(observer, 'getObserverFunction')
        const givenEventName = 'POSITION_DISPLAYED'
        const givenPosition = new Position({status: POSITION_NOT_VISIBLE})
        DomainEventBus.clearAllObservers()
        DomainEventBus.register({eventName: givenEventName, observer: observer.getObserverFunction})

        givenPosition.changeStatus({newStatus: POSITION_VISIBLE})

        expect(givenPosition.status).equal(POSITION_VISIBLE)
        expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
        expect(observerSpy.calledOnce).equal(true)
        expect(observerSpy.lastCall.args[0].payload.id).undefined
        expect(observerSpy.lastCall.args[0].payload.status).equal(POSITION_VISIBLE)
        done()
      })
      it('Should raise POSITION_ALREADY_DISPLAYED event when changing the position status from POSITION_VISIBLE to POSITION_VISIBLE', (done) => {
        const observer = {
          getObserverFunction: ({payload, dispatcher}) => { }
        }
        const observerSpy = sinon.spy(observer, 'getObserverFunction')
        const givenEventName = 'POSITION_ALREADY_DISPLAYED'
        const givenPosition = new Position({status: POSITION_VISIBLE})

        DomainEventBus.register({eventName: givenEventName, observer: observer.getObserverFunction})

        givenPosition.changeStatus({newStatus: POSITION_VISIBLE})

        expect(givenPosition.status).equal(POSITION_VISIBLE)
        expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
        expect(observerSpy.calledOnce).equal(true)
        expect(observerSpy.lastCall.args[0].payload.id).undefined
        expect(observerSpy.lastCall.args[0].payload.status).equal(POSITION_VISIBLE)
        done()
      })
    })
  })
})
