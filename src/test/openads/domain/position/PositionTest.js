import Position from '../../../../openads/domain/position/Position'
import {expect} from 'chai'
import {
  POSITION_NOT_VISIBLE,
  POSITION_VISIBLE
} from '../../../../openads/domain/position/positionStatus'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import sinon from 'sinon'
import {POSITION_CREATED} from '../../../../openads/domain/position/positionCreated'
import {POSITION_UPDATED} from '../../../../openads/domain/position/positionUpdated'

describe('Position', () => {
  beforeEach(() => {
    DomainEventBus.clearAllObservers()
  })
  it('Should create a Domain Position and raise an event', () => {
    DomainEventBus.register({
      eventName: POSITION_CREATED,
      observer: ({payload, dispatcher}) =>
        expect(payload.id).to.be.equal('top1')
    })
    const givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      specification: {
        source: 'appnexus',
        appnexus: {
          placement: 'lalala',
          segmentation: 'idkfa&iddqd',
          sizes: [],
          native: {}
        }
      }
    })
    expect(
      givenPosition.specification.appnexus.segmentation,
      'Tricks for DOOM!!'
    ).to.be.equal('idkfa&iddqd')
  })

  it('Should update the position with new segmentation data and raise an event', () => {
    DomainEventBus.register({
      eventName: POSITION_UPDATED,
      observer: ({payload, dispatcher}) => {
        expect(payload.id).to.be.equal('top1')
        expect(payload.segmentation).to.be.equal('godmode=true')
      }
    })
    const givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      specification: {
        source: 'appnexus',
        appnexus: {
          placement: 'lalala',
          segmentation: 'idkfa&iddqd',
          sizes: [],
          native: {}
        }
      }
    })
    const newSpecification = {
      source: 'appnexus',
      appnexus: {
        placement: 'lelele',
        segmentation: 'godmode=true',
        sizes: [],
        native: {}
      }
    }
    const updatedPosition = givenPosition.update({
      specification: newSpecification
    })
    expect(updatedPosition.specification, 'Tricks for DOOM!!').to.deep.equal(
      newSpecification
    )
  })

  it("Shouldn't update any field of the position", () => {
    const observerSpy = sinon.spy()

    const givenSpecification = {
      source: 'appnexus',
      appnexus: {
        placement: 'lalala',
        segmentation: 'idkfa&iddqd',
        sizes: [],
        native: {}
      }
    }
    DomainEventBus.register({
      eventName: POSITION_UPDATED,
      observer: ({payload, dispatcher}) => {
        expect(payload.id).to.be.equal('top1')
        expect(payload.specification).to.deep.equal(givenSpecification)
        observerSpy()
      }
    })
    const givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      specification: givenSpecification
    })
    const updatedPosition = givenPosition.update({})
    expect(
      updatedPosition.specification,
      'specification should not change'
    ).to.deep.equal(givenSpecification)
    expect(observerSpy.calledOnce, 'observer should be called once').to.be.true
  })
  describe('changeStatus method', () => {
    describe('Given a valid input status', () => {
      it('Should change the position status and return the position with the changed status', done => {
        const position = new Position({
          status: POSITION_NOT_VISIBLE,
          specification: {source: 'invent'}
        })
        const result = position.changeStatus({newStatus: POSITION_VISIBLE})
        expect(result.status).equal(POSITION_VISIBLE)
        done()
      })
      it('Should raise POSITION_DISPLAYED event when changing the position status from POSITION_NOT_VISIBLE to POSITION_VISIBLE', done => {
        const observer = {
          getObserverFunction: ({payload, dispatcher}) => {}
        }
        const observerSpy = sinon.spy(observer, 'getObserverFunction')
        const givenEventName = 'POSITION_DISPLAYED'
        const givenPosition = new Position({
          status: POSITION_NOT_VISIBLE,
          specification: {source: 'invent'}
        })
        DomainEventBus.clearAllObservers()
        DomainEventBus.register({
          eventName: givenEventName,
          observer: observer.getObserverFunction
        })

        givenPosition.changeStatus({newStatus: POSITION_VISIBLE})

        expect(givenPosition.status).equal(POSITION_VISIBLE)
        expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
        expect(observerSpy.calledOnce).equal(true)
        expect(observerSpy.lastCall.args[0].payload.id).undefined
        expect(observerSpy.lastCall.args[0].payload.status).equal(
          POSITION_VISIBLE
        )
        done()
      })
      it('Should raise POSITION_ALREADY_DISPLAYED event when changing the position status from POSITION_VISIBLE to POSITION_VISIBLE', done => {
        const observer = {
          getObserverFunction: ({payload, dispatcher}) => {}
        }
        const observerSpy = sinon.spy(observer, 'getObserverFunction')
        const givenEventName = 'POSITION_ALREADY_DISPLAYED'
        const givenPosition = new Position({
          status: POSITION_VISIBLE,
          specification: {source: 'invent'}
        })

        DomainEventBus.register({
          eventName: givenEventName,
          observer: observer.getObserverFunction
        })

        givenPosition.changeStatus({newStatus: POSITION_VISIBLE})

        expect(givenPosition.status).equal(POSITION_VISIBLE)
        expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
        expect(observerSpy.calledOnce).equal(true)
        expect(observerSpy.lastCall.args[0].payload.id).undefined
        expect(observerSpy.lastCall.args[0].payload.status).equal(
          POSITION_VISIBLE
        )
        done()
      })
    })
  })
})
