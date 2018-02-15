import Position from '../../../../openads/domain/position/Position'
import {expect} from 'chai'
import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import sinon from 'sinon'
import {expect} from 'chai'
import Position from '../../../../openads/domain/position/Position'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import {POSITION_CREATED} from '../../../../openads/domain/position/positionCreated'

describe('Position test', () => {

  describe('Ad', () => {
    it('Should return an error calling to Ad#show instead of a extending class implementation', () => {
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
  })

  describe('changeStatus method', () => {
    describe('Given an invalid input status', () => {
      it('Should return a rejected promise', (done) => {
        const position = new Position()
        position.changeStatus()
          .then(() => done(new Error('Should be failing')))
          .catch((err) => {
            expect(err.message).equals('Invalid position status.')
            done()
          })
      })
    })
    describe('Given a valid input status', () => {
      it('Should change the position status and return a promise containing the position with the changed status', (done) => {
        const position = new Position({status: POSITION_NOT_VISIBLE})
        position.changeStatus({newStatus: POSITION_VISIBLE})
          .then(() => {
            expect(position.status).equal(POSITION_VISIBLE)
            done()
          })
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
          .then(() => {
            expect(givenPosition.status).equal(POSITION_VISIBLE)
            expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
            expect(observerSpy.calledOnce).equal(true)
            expect(observerSpy.lastCall.args[0].payload.id).undefined
            expect(observerSpy.lastCall.args[0].payload.status).equal(POSITION_VISIBLE)
            done()
          })
      })
      it('Should raise POSITION_ALREADY_DISPLAYED event when changing the position status from POSITION_VISIBLE to POSITION_VISIBLE', (done) => {
        const observer = {
          getObserverFunction: ({payload, dispatcher}) => { }
        }
        const observerSpy = sinon.spy(observer, 'getObserverFunction')
        const givenEventName = 'POSITION_ALREADY_DISPLAYED'
        const givenPosition = new Position({status: POSITION_VISIBLE})
        DomainEventBus.clearAllObservers()
        DomainEventBus.register({eventName: givenEventName, observer: observer.getObserverFunction})
        givenPosition.changeStatus({newStatus: POSITION_VISIBLE})
          .then(() => {
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
})
