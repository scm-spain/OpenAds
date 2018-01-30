import {expect} from 'chai'
import sinon from 'sinon'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import DomainEventBusWrapper from './helper/DomainEventBusWrapper'

describe('DomainEventBus test', () => {
  describe('Given a registered DomainEventBus', () => {
    const givenEventName = 'givenEventName'
    let observerSpy = sinon.spy()
    DomainEventBus.register({eventName: givenEventName, observer: observerSpy})
    it('Should execute observer callback using the raised payload', (done) => {
      const domainEvent = {
        eventName: givenEventName,
        payload: 'domainEvent payload'
      }
      DomainEventBus.raise({domainEvent})
      expect(observerSpy.calledOnce).equal(true)
      expect(observerSpy.lastCall.args[0].payload).equal(domainEvent.payload)
      expect(DomainEventBus.getObservers().size).equal(1)

      const domainEventBusTestHelper = new DomainEventBusWrapper()
      const givenEventName2 = 'givenEventName2'
      let observer2Spy = sinon.spy()
      domainEventBusTestHelper.register({eventName: givenEventName2, observer: observer2Spy})
      const domainEvent2 = {
        eventName: givenEventName2,
        payload: 'domainEvent 2 payload'
      }
      domainEventBusTestHelper.raise({domainEvent: domainEvent2})
      expect(observer2Spy.calledOnce).equal(true)
      expect(observer2Spy.lastCall.args[0].payload).equal(domainEvent2.payload)
      expect(DomainEventBus.getObservers().size).equal(2)

      done()
    })
  })
})
