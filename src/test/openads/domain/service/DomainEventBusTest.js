import {expect} from 'chai'
import sinon from 'sinon'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import DomainEventBusWrapper from './helper/DomainEventBusWrapper'

describe('DomainEventBus test', () => {
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
      expect(DomainEventBus.getObservers().size).equal(1)

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
      expect(DomainEventBus.getObservers().size).equal(2)
      done()
    })
    it('Should clear all observers', (done) => {
      DomainEventBus.clearAllObservers()
      expect(DomainEventBus.getObservers().size).equal(0)
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
      expect(DomainEventBus.getObservers().size).equal(1)
      expect(DomainEventBus.getObservers().get(givenEventName).length).equal(2)
      done()
    })
  })
  describe('Given 2 events and 2 related observers', () => {
    let event1ObserverSpy = sinon.spy()
    let event2ObserverSpy = sinon.spy()
    beforeEach(function () {
      event1ObserverSpy.reset()
      event2ObserverSpy.reset()
    })
    it('Should define a dispatcher as function when raising event 1', (done) => {
      const givenEvent1Name = 'event-1'
      const givenEvent2Name = 'event-2'
      const event2DomainEvent = {
        eventName: givenEvent2Name,
        payload: 'event-2-payload'
      }
      const event1DomainEvent = {
        eventName: givenEvent1Name,
        payload: 'event-1-payload',
        dispatcher: event2DomainEvent
      }
      DomainEventBus.clearAllObservers()
      DomainEventBus.register({eventName: givenEvent1Name, observer: event1ObserverSpy})
      DomainEventBus.register({eventName: givenEvent2Name, observer: event2ObserverSpy})
      DomainEventBus.raise({domainEvent: event1DomainEvent})

      expect(DomainEventBus.getObservers().size).equal(2)
      expect(event1ObserverSpy.calledOnce).equal(true)
      expect(event1ObserverSpy.lastCall.args[0].payload).equal(event1DomainEvent.payload)
      expect(event1ObserverSpy.lastCall.args[0].dispatcher).is.a('function')
      done()
    })
  })
})
