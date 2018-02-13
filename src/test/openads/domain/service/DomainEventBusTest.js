/* eslint-disable no-alert, no-console */

import {expect} from 'chai'
import sinon from 'sinon'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import DomainEventBusWrapper from './helper/DomainEventBusWrapper'
import {POSITION_ADDED, positionAdded} from '../../../../openads/domain/position/positionAdded'

describe('DomainEventBus test', () => {
  describe('Given invalid register parameters', () => {
    it('Should fail if eventName is not present', (done) => {
      try {
        DomainEventBus.register({eventName: undefined, observer: undefined})
        done(new Error('Should fail'))
      } catch (error) {
        done()
      }
    })
    it('Should fail if observer is not a function', (done) => {
      try {
        DomainEventBus.register({eventName: 'givenEvent', observer: undefined})
        done(new Error('Should fail'))
      } catch (error) {
        done()
      }
    })
    it('Should return 0 when calling getNumberOfRegisteredEvents if there is no events registered', (done) => {
      const result = DomainEventBus.getNumberOfRegisteredEvents()
      expect(0).equal(result)
      done()
    })
    it('Should return 0 when calling getNumberOfObserversRegisteredForAnEvent if there is no events registered', (done) => {
      const givenEventName = 'nonExistingEvent'
      const result = DomainEventBus.getNumberOfObserversRegisteredForAnEvent({eventName: givenEventName})
      expect(0).equal(result)
      done()
    })
  })
  describe('Given a registered DomainEventBus', () => {
    let observerSpy = sinon.spy()
    beforeEach(function () {
      observerSpy.reset()
    })
    it('Should execute observer callback using the raised payload', (done) => {
      const givenEventName = 'givenEventName'
      const domainEvent = {
        eventName: givenEventName,
        payload: 'domainEvent payload'
      }
      DomainEventBus.clearAllObservers()
      DomainEventBus.register({eventName: givenEventName, observer: observerSpy})
      DomainEventBus.raise({domainEvent})

      expect(observerSpy.calledOnce).equal(true)
      expect(observerSpy.lastCall.args[0].payload).equal(domainEvent.payload)
      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)

      const domainEventBusTestHelper = new DomainEventBusWrapper()
      const givenEventName2 = 'givenEventName2'
      const domainEvent2 = {
        eventName: givenEventName2,
        payload: 'domainEvent 2 payload'
      }
      domainEventBusTestHelper.register({eventName: givenEventName2, observer: observerSpy})
      domainEventBusTestHelper.raise({domainEvent: domainEvent2})

      expect(observerSpy.calledTwice).equal(true)
      expect(observerSpy.lastCall.args[0].payload).equal(domainEvent2.payload)
      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(2)
      done()
    })
    it('Should clear all observers', (done) => {
      DomainEventBus.clearAllObservers()
      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(0)
      done()
    })
    it('Should execute all observers related to an event', (done) => {
      const givenEventName = 'givenEventName'
      const domainEvent = {
        eventName: givenEventName,
        payload: '1'
      }

      DomainEventBus.clearAllObservers()
      DomainEventBus.register({eventName: givenEventName, observer: observerSpy})
      DomainEventBus.register({eventName: givenEventName, observer: observerSpy})
      DomainEventBus.raise({domainEvent: domainEvent})
      expect(observerSpy.getCalls().length).equal(2)
      expect(observerSpy.getCall(0).args[0].payload).equal(domainEvent.payload)
      expect(observerSpy.getCall(1).args[0].payload).equal(domainEvent.payload)
      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(1)
      expect(DomainEventBus.getNumberOfObserversRegisteredForAnEvent({eventName: givenEventName})).equal(2)
      done()
    })
  })
  describe('Given 1 event with 1 subscriber which has a dispatcher to raise a second event with another subscriber', () => {
    it('Should be raised event 2 by subscriber 1 when event 1 is raised', (done) => {
      const givenEvent1Name = 'event-1'
      const event1DomainEvent = {
        eventName: givenEvent1Name,
        payload: 'event-1-payload'
      }
      const givenEvent2Name = 'event-2'
      const event2DomainEvent = {
        eventName: givenEvent2Name,
        payload: 'event-2-payload'
      }
      const observer1 = {
        getObserverFunction: ({payload, dispatcher}) => {
          dispatcher(event2DomainEvent)
        }
      }
      const observer2 = {
        getObserverFunction: ({payload, dispatcher}) => {
        }
      }
      const spy1 = sinon.spy(observer1, 'getObserverFunction')
      const spy2 = sinon.spy(observer2, 'getObserverFunction')

      DomainEventBus.clearAllObservers()
      DomainEventBus.register({eventName: givenEvent1Name, observer: observer1.getObserverFunction})
      DomainEventBus.register({eventName: givenEvent2Name, observer: observer2.getObserverFunction})
      DomainEventBus.raise({domainEvent: event1DomainEvent})
      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(2)
      expect(spy1.calledOnce).equal(true)
      expect(spy1.getCall(0).args[0].payload).equal(event1DomainEvent.payload)
      expect(spy1.getCall(0).args[0].dispatcher).is.a('function')
      expect(spy2.calledOnce).equal(true)
      expect(spy2.getCall(0).args[0].payload).equal(event2DomainEvent.payload)
      expect(spy2.getCall(0).args[0].dispatcher).is.a('function')
      done()
    })
  })
  describe('Given 1 event with 2 subscribers, one of them causing an error', () => {
    it('Should execute the non failing subscriber smoothly and log the error', (done) => {
      const givenEvent1Name = 'event-1'
      const event1DomainEvent = {
        eventName: givenEvent1Name,
        payload: 'event-1-payload'
      }
      const observer1 = {
        getObserverFunction: ({payload, dispatcher}) => {
          // observer1 will fail
          throw new Error('expected error')
        }
      }
      const observer2 = {
        getObserverFunction: ({payload, dispatcher}) => {
          // observer2 will work
        }
      }
      const spy1 = sinon.spy(observer1, 'getObserverFunction')
      const spy2 = sinon.spy(observer2, 'getObserverFunction')

      DomainEventBus.clearAllObservers()
      const errorObserver = (payload) => { console.log('ERROR_EVENT TEST: ', payload) }
      DomainEventBus.register({
        eventName: 'ERROR_EVENT',
        observer: errorObserver})

      DomainEventBus.register({eventName: givenEvent1Name, observer: observer1.getObserverFunction})
      DomainEventBus.register({eventName: givenEvent1Name, observer: observer2.getObserverFunction})
      DomainEventBus.raise({domainEvent: event1DomainEvent})

      expect(DomainEventBus.getNumberOfRegisteredEvents()).equal(2)
      expect(DomainEventBus.getNumberOfObserversRegisteredForAnEvent({eventName: givenEvent1Name})).equal(2)
      expect(spy1.calledOnce).equal(true)
      expect(spy2.calledOnce).equal(true)
      done()
    })
  })

  describe('Given 1 event with no subscribers', () => {
    it('Should do nothing', (done) => {
      DomainEventBus.clearAllObservers()
      DomainEventBus.raise({domainEvent: positionAdded({})})
      done()
    })
  })
})
