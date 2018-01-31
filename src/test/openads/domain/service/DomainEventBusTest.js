import {expect} from 'chai'
import sinon from 'sinon'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import DomainEventBusWrapper from './helper/DomainEventBusWrapper'

describe('DomainEventBus test', () => {
  describe('Given a registered DomainEventBus', () => {
    let spy = sinon.spy()
    beforeEach(function () {
      spy.reset()
    })
    it('Should execute observer callback using the raised payload', (done) => {
      const givenEventName = 'givenEventName'
      DomainEventBus.register({eventName: givenEventName, observer: spy})
      const domainEvent = {
        eventName: givenEventName,
        payload: 'domainEvent payload'
      }
      DomainEventBus.raise({domainEvent})
      expect(spy.calledOnce).equal(true)
      expect(spy.lastCall.args[0].payload).equal(domainEvent.payload)
      expect(DomainEventBus.getObservers().size).equal(1)

      const domainEventBusTestHelper = new DomainEventBusWrapper()
      const givenEventName2 = 'givenEventName2'
      domainEventBusTestHelper.register({eventName: givenEventName2, observer: spy})
      const domainEvent2 = {
        eventName: givenEventName2,
        payload: 'domainEvent 2 payload'
      }
      domainEventBusTestHelper.raise({domainEvent: domainEvent2})
      expect(spy.calledTwice).equal(true)
      expect(spy.lastCall.args[0].payload).equal(domainEvent2.payload)
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
      DomainEventBus.register({eventName: givenEventName, observer: spy})
      DomainEventBus.register({eventName: givenEventName, observer: spy})
      DomainEventBus.raise({domainEvent: domainEvent})
      expect(spy.getCalls().length).equal(2)
      expect(spy.getCall(0).args[0].payload).equal(domainEvent.payload)
      expect(spy.getCall(1).args[0].payload).equal(domainEvent.payload)
      expect(DomainEventBus.getObservers().size).equal(1)
      expect(DomainEventBus.getObservers().get(givenEventName).length).equal(2)
      done()
    })
  })
})
