/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import EventDispatcher from '../../../../openads/infrastructure/service/EventDispatcher'

describe('Event Dispatcher', function () {
  describe('Given a valid event, position and function', function () {
    it('Should be able to run multiple observers on same position for one event', function () {
      const givenEvent1 = {
        eventName: 'TEST',
        position: 'P1',
        observer: ({payload}) => null
      }
      const givenEvent2 = {
        eventName: 'TEST',
        position: 'P1',
        observer: ({payload}) => null
      }
      sinon.spy(givenEvent1, 'observer')
      sinon.spy(givenEvent2, 'observer')

      const givenPayload = {
        hey: 'test'
      }

      const eventDispatcher = new EventDispatcher()
      eventDispatcher.addObserver(givenEvent1)
      eventDispatcher.addObserver(givenEvent2)
      eventDispatcher.dispatch({eventName: givenEvent1.eventName, position: givenEvent1.position, payload: givenPayload})

      expect(givenEvent1.observer.calledOnce).to.be.true
      expect(givenEvent1.observer.args[0][0].payload).to.deep.equal(givenPayload)
      expect(givenEvent2.observer.calledOnce).to.be.true
      expect(givenEvent2.observer.args[0][0].payload).to.deep.equal(givenPayload)
    })
    it('Should be able to distinct observers on distinct positions for one event', function () {
      const givenEvent1 = {
        eventName: 'TEST',
        position: 'P1',
        observer: ({payload}) => null
      }
      const givenEvent2 = {
        eventName: 'TEST',
        position: 'P2',
        observer: ({payload}) => null
      }
      sinon.spy(givenEvent1, 'observer')
      sinon.spy(givenEvent2, 'observer')

      const givenPayload = {
        hey: 'test'
      }

      const eventDispatcher = new EventDispatcher()
      eventDispatcher.addObserver(givenEvent1)
      eventDispatcher.addObserver(givenEvent2)
      eventDispatcher.dispatch({eventName: givenEvent1.eventName, position: givenEvent1.position, payload: givenPayload})
      eventDispatcher.dispatch({eventName: givenEvent2.eventName, position: givenEvent2.position, payload: givenPayload})

      expect(givenEvent1.observer.calledOnce).to.be.true
      expect(givenEvent1.observer.args[0][0].payload).to.deep.equal(givenPayload)
      expect(givenEvent2.observer.calledOnce).to.be.true
      expect(givenEvent2.observer.args[0][0].payload).to.deep.equal(givenPayload)
    })
    it('Should be able to distinct observers on distinct positions on distinct events', function () {
      const givenEvent1 = {
        eventName: 'TEST1',
        position: 'P1',
        observer: ({payload}) => null
      }
      const givenEvent2 = {
        eventName: 'TEST2',
        position: 'P2',
        observer: ({payload}) => null
      }
      sinon.spy(givenEvent1, 'observer')
      sinon.spy(givenEvent2, 'observer')

      const givenPayload = {
        hey: 'test'
      }

      const eventDispatcher = new EventDispatcher()
      eventDispatcher.addObserver(givenEvent1)
      eventDispatcher.addObserver(givenEvent2)
      eventDispatcher.dispatch({eventName: givenEvent1.eventName, position: givenEvent1.position, payload: givenPayload})
      eventDispatcher.dispatch({eventName: givenEvent2.eventName, position: givenEvent2.position, payload: givenPayload})

      expect(givenEvent1.observer.calledOnce).to.be.true
      expect(givenEvent1.observer.args[0][0].payload).to.deep.equal(givenPayload)
      expect(givenEvent2.observer.calledOnce).to.be.true
      expect(givenEvent2.observer.args[0][0].payload).to.deep.equal(givenPayload)
    })
  })
})
