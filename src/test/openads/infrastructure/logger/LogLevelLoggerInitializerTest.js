import {expect} from 'chai'
import sinon from 'sinon'
import LogLevelLoggerInitializer from '../../../../openads/infrastructure/logger/LogLevelLoggerInitializer'

describe('LogLevel Logger Initializer', () => {
  describe('Given a logger name, calling to get a logger', () => {
    const givenLoggerName = 'whatever'
    it('Should call the configurator init to retrieve the logger, and the logger prefixer', () => {
      const loggerMock = {
        id: givenLoggerName
      }
      const loggerLevelConfiguratorMock = {
        init: ({loggerName}) => loggerMock
      }
      const loggerPrefixConfiguratorMock = {
        applyPrefix: () => null
      }
      const loggerInitSpy = sinon.spy(loggerLevelConfiguratorMock, 'init')
      const loggerApplyPrefixSpy = sinon.spy(loggerPrefixConfiguratorMock, 'applyPrefix')

      const initializer = new LogLevelLoggerInitializer({
        loggerLevelConfigurator: loggerLevelConfiguratorMock,
        loggerPrefixConfigurator: loggerPrefixConfiguratorMock
      })
      expect(() => initializer.logger({
        loggerName: givenLoggerName
      })).to.not.throw()

      expect(loggerInitSpy.calledOnce).to.be.true
      expect(loggerInitSpy.args[0][0]).to.deep.equal({
        loggerName: givenLoggerName
      })
      expect(loggerApplyPrefixSpy.calledOnce).to.be.true
      expect(loggerApplyPrefixSpy.args[0][0]).to.deep.equal({
        logger: loggerMock
      })
    })
  })
})
