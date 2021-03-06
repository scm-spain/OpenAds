import {expect} from 'chai'
import sinon from 'sinon'
import LogLevelLoggerInitializer from '../../../../openads/infrastructure/logger/LogLevelLoggerInitializer'

describe('LogLevel Logger Initializer', () => {
  const givenLoggerName = 'OpenAds'
  it('Should use error as default level if no DEBUG option is set', () => {
    const givenSearch = ''
    const givenLocalStorageValue = null
    const loggerMock = {
      setLevel: level => null
    }
    const logLevelMock = {
      getLogger: loggerName => loggerMock
    }
    const domDriverMock = {
      getQueryString: () => givenSearch,
      getLocalStorageValue: () => givenLocalStorageValue
    }

    const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

    const logLevelInitializer = new LogLevelLoggerInitializer({
      logLevel: logLevelMock,
      domDriver: domDriverMock,
      loggerName: givenLoggerName
    })
    logLevelInitializer.logger()
    expect(setLevelSpy.calledOnce).to.be.true
    expect(setLevelSpy.args[0][0]).to.equal('error')
  })
  it('Should use debug as level if DEBUG option is in URL, enabling debug to any connector implementing Logger interface', () => {
    const givenSearch = '?a=a&openads_debug&b=b'
    const givenLocalStorageValue = 'false'
    const loggerMock = {
      setLevel: level => null
    }
    const logLevelMock = {
      getLogger: loggerName => loggerMock
    }
    const domDriverMock = {
      getQueryString: () => givenSearch,
      getLocalStorageValue: () => givenLocalStorageValue
    }
    const fooLoggerConnector = {
      enableDebug: ({debug}) => null
    }
    const noLoggerConnector = {}
    const givenConnectors = {
      a: noLoggerConnector,
      b: fooLoggerConnector,
      c: noLoggerConnector
    }

    const setLevelSpy = sinon.spy(loggerMock, 'setLevel')
    const setConnectorEnableDebugSpy = sinon.spy(
      fooLoggerConnector,
      'enableDebug'
    )

    const logLevelInitializer = new LogLevelLoggerInitializer({
      logLevel: logLevelMock,
      domDriver: domDriverMock,
      loggerName: givenLoggerName,
      connectors: givenConnectors
    })
    logLevelInitializer.logger()
    expect(setLevelSpy.calledOnce).to.be.true
    expect(setLevelSpy.args[0][0]).to.equal('debug')
    expect(setConnectorEnableDebugSpy.calledOnce).to.be.true
    expect(setConnectorEnableDebugSpy.args[0][0].debug).to.be.true
  })
  it('Should enable DEBUG if the openads_debug option is set in local storage', () => {
    const givenSearch = ''
    const givenLocalStorageValue = 'true'
    const loggerMock = {
      setLevel: level => null
    }
    const logLevelMock = {
      getLogger: loggerName => loggerMock
    }
    const domDriverMock = {
      getQueryString: () => givenSearch,
      getLocalStorageValue: () => givenLocalStorageValue
    }

    const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

    const logLevelInitializer = new LogLevelLoggerInitializer({
      logLevel: logLevelMock,
      domDriver: domDriverMock,
      loggerName: givenLoggerName
    })
    logLevelInitializer.logger()
    expect(setLevelSpy.calledOnce).to.be.true
    expect(setLevelSpy.args[0][0]).to.equal('debug')
  })
})
