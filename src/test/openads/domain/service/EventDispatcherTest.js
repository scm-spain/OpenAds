
import {expect} from 'chai'
import sinon from 'sinon'
import EventDispatcher from '../../../../openads/domain/service/EventDispatcher'

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
    it('Should be able to run distinct observers on distinct positions for one event', function () {
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
    it('Should be able to run distinct observers on distinct positions on distinct events', function () {
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
  describe('Given an invalid event name', function () {
    it('Should fail registering the event', function () {
      const givenEvent = {
        position: 'P1',
        observer: ({payload}) => null
      }
      const eventDispatcher = new EventDispatcher()
      expect(() => eventDispatcher.addObserver(givenEvent))
        .to.throw('Event Name is required')
    })
  })
  describe('Given an invalid position', function () {
    it('Should fail registering the event', function () {
      const givenEvent = {
        eventName: 'Ev',
        observer: ({payload}) => null
      }
      const eventDispatcher = new EventDispatcher()
      expect(() => eventDispatcher.addObserver(givenEvent))
        .to.throw('Position is required')
    })
  })
  describe('Given a non function observer', function () {
    it('Should fail registering the event', function () {
      const givenEvent = {
        eventName: 'Ev',
        position: 'X',
        observer: {}
      }
      const eventDispatcher = new EventDispatcher()
      expect(() => eventDispatcher.addObserver(givenEvent))
        .to.throw('Observer must be a function')
    })
  })
  describe('Given two function observers on same position and event', function () {
    it('Should be able to remove an observer', function () {
      let data = {
        run1: false,
        run2: false
      }
      const givenEvent1 = {
        eventName: 'Ev',
        position: 'X',
        observer: () => { data.run1 = true }
      }
      const givenEvent2 = {
        eventName: 'Ev',
        position: 'X',
        observer: () => { data.run2 = true }
      }
      const eventDispatcher = new EventDispatcher()
      eventDispatcher.addObserver(givenEvent1)
      eventDispatcher.addObserver(givenEvent2)
      eventDispatcher.removeObserver(givenEvent1)

      eventDispatcher.dispatch({eventName: givenEvent2.eventName, position: givenEvent2.position, payload: {}})

      expect(data.run1).to.be.false
      expect(data.run2).to.be.true
    })
  })
})
