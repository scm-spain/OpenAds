import {expect} from 'chai'
import sinon from 'sinon'
import LoggerInitializer from '../../../../openads/domain/service/LoggerInitializer'

describe('LoggerInitializer', function () {
  describe('Given context parameters without the openads_debug key', function () {
    const givenContextParameters = {'a': 'b'}
    it('Should do not change the logger level', function () {
      const loggerMock = {
        setLevel: (level) => null
      }
      const contextParametersServiceMock = {
        getContextParameters: () => givenContextParameters
      }
      const getContextParametersSpy = sinon.spy(contextParametersServiceMock, 'getContextParameters')
      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      expect(() => new LoggerInitializer({
        logger: loggerMock,
        contextParametersService: contextParametersServiceMock
      })).to.not.throw()

      expect(getContextParametersSpy.calledOnce).to.be.true
      expect(setLevelSpy.notCalled).to.be.true
    })
  })
  describe('Given context parameters with the openads_debug key', function () {
    const givenContextParameters = {'openads_debug': ''}
    it('Should change the logger level to debug', function () {
      const loggerMock = {
        setLevel: (level) => null
      }
      const contextParametersServiceMock = {
        getContextParameters: () => givenContextParameters
      }
      const getContextParametersSpy = sinon.spy(contextParametersServiceMock, 'getContextParameters')
      const setLevelSpy = sinon.spy(loggerMock, 'setLevel')

      expect(() => new LoggerInitializer({
        logger: loggerMock,
        contextParametersService: contextParametersServiceMock
      })).to.not.throw()

      expect(getContextParametersSpy.calledOnce).to.be.true
      expect(setLevelSpy.calledOnce).to.be.true
      expect(setLevelSpy.args[0][0]).to.equal('debug')
    })
  })
})
