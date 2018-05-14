import {expect} from 'chai'
import sinon from 'sinon'
import LogLevelLoggerInitializer from '../../../../openads/infrastructure/logger/LogLevelLoggerInitializer'

describe('LogLevel Logger Initializer', () => {
  const givenLoggerName = 'OpenAds'
  describe('Given no level to be configured', () => {
    it('Should use error as default level if no DEBUG option is in URL', () => {
      const givenSearch = ''
      const loggerMock = {
        setLevel: (level) => null
      }
      const logLevelMock = {
        getLogger: (loggerName) => loggerMock
      }
      const domDriverMock = {
        getQueryString: () => givenSearch
      }

      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      const levelConfigurator = new LogLevelLoggerInitializer({
        logLevel: logLevelMock,
        domDriver: domDriverMock
      })
      levelConfigurator.init({
        loggerName: givenLoggerName
      })
      expect(setLevelSpy.calledOnce).to.be.true
      expect(setLevelSpy.args[0][0]).to.equal('error')
    })
    it('Should use debug as level if DEBUG option is in URL', () => {
      const givenSearch = '?a=a&openads_debug&b=b'
      const loggerMock = {
        setLevel: (level) => null
      }
      const logLevelMock = {
        getLogger: (loggerName) => loggerMock
      }
      const domDriverMock = {
        getQueryString: () => givenSearch
      }

      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      const levelConfigurator = new LogLevelConfigurator({
        logLevel: logLevelMock,
        domDriver: domDriverMock
      })
      levelConfigurator.init({
        loggerName: givenLoggerName
      })
      expect(setLevelSpy.calledOnce).to.be.true
      expect(setLevelSpy.args[0][0]).to.equal('debug')
    })
  })
  describe('Given level to be configured', () => {
    const givenOptions = {
      Level: 'info'
    }
    it('Should use the level if no DEBUG option is in URL', () => {
      const givenSearch = ''
      const loggerMock = {
        setLevel: (level) => null
      }
      const logLevelMock = {
        getLogger: (loggerName) => loggerMock
      }
      const domDriverMock = {
        getQueryString: () => givenSearch
      }

      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      const levelConfigurator = new LogLevelLoggerInitializer({
        logLevel: logLevelMock,
        domDriver: domDriverMock,
        options: givenOptions
      })
      levelConfigurator.init({
        loggerName: givenLoggerName
      })
      expect(setLevelSpy.calledOnce).to.be.true
      expect(setLevelSpy.args[0][0]).to.equal(givenOptions.Level)
    })
    it('Should use debug as level if DEBUG option is in URL', () => {
      const givenSearch = '?a=a&openads_debug&b=b'
      const loggerMock = {
        setLevel: (level) => null
      }
      const logLevelMock = {
        getLogger: (loggerName) => loggerMock
      }
      const domDriverMock = {
        getQueryString: () => givenSearch
      }

      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      const levelConfigurator = new LogLevelLoggerInitializer({
        logLevel: logLevelMock,
        domDriver: domDriverMock,
        options: givenOptions
      })
      levelConfigurator.init({
        loggerName: givenLoggerName
      })
      expect(setLevelSpy.calledOnce).to.be.true
      expect(setLevelSpy.args[0][0]).to.equal('debug')
    })
  })
})
