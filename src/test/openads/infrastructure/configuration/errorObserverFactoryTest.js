import {errorObserverFactory} from '../../../../openads/infrastructure/configuration/errorObserverFactory'
import {expect} from 'chai'
import sinon from 'sinon'

describe('errorObserverFactory test', () => {
  describe('Given a fake logger', () => {
    it('Should use this logger calling error method with expected parameters', () => {
      const givenLogger = {
        error: (p1, p2) => {}
      }
      const loggerSpy = sinon.spy(givenLogger, 'error')
      const givenPayload = {
        message: 'Error processing the observer.',
        error: 'err'
      }
      const givenErrorEventMessage = 'ERROR_EVENT'

      const observer = errorObserverFactory(givenLogger)
      observer({payload: givenPayload})

      expect(loggerSpy.calledOnce).equal(true)
      expect(loggerSpy.getCall(0).args[0]).equal(givenErrorEventMessage)
      expect(loggerSpy.getCall(0).args[1]).equal(givenPayload)
    })
  })
})
