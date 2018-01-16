import {expect} from 'chai'
import sinon from 'sinon'
import LogLevelPrefixConfigurator from '../../../../openads/infrastructure/logger/LogLevelPrefixConfigurator'

describe('LogLevel Prefix Configurator', () => {
  describe('Given filled options and a logger', () => {
    const givenOptions = {
      template: '[%t]',
      timestampFormatter: (date) => 'static'
    }
    const givenLogger = {
      id: 'OpenAds'
    }
    it('Should call the prefixer with the retrieved options', () => {
      const logLevelPrefixMock = {
        apply: (logger, options) => null
      }
      const applySpy = sinon.spy(logLevelPrefixMock, 'apply')
      const prefixConfigurator = new LogLevelPrefixConfigurator({
        logLevelPrefix: logLevelPrefixMock,
        options: givenOptions
      })

      prefixConfigurator.applyPrefix({logger: givenLogger})

      expect(applySpy.calledOnce).to.be.true
      expect(applySpy.args[0][0]).to.deep.equal(givenLogger)
      expect(applySpy.args[0][1]).to.deep.equal(givenOptions)
    })
  })
  describe('Given empty options', () => {
    const givenOptions = {}
    const givenLogger = {
      id: 'OpenAds'
    }
    it('Should call the prefixer with default template and timestampFormatter', () => {
      const givenDate = new Date(2010, 10, 6, 8, 50, 1, 20)
      const logLevelMock = {}
      const logLevelPrefixMock = {
        apply: (loglevel, options) => null
      }
      const applySpy = sinon.spy(logLevelPrefixMock, 'apply')
      const prefixConfigurator = new LogLevelPrefixConfigurator({
        logLevel: logLevelMock,
        logLevelPrefix: logLevelPrefixMock,
        options: givenOptions
      })

      prefixConfigurator.applyPrefix({logger: givenLogger})

      expect(applySpy.calledOnce).to.be.true
      expect(applySpy.args[0][0]).to.deep.equal(givenLogger)
      expect(applySpy.args[0][1].template).to.equal('[%t] %l | %n:')
      expect(applySpy.args[0][1].timestampFormatter).to.be.a('function')

      const formattedDate = applySpy.args[0][1].timestampFormatter(givenDate)

      expect(formattedDate).to.equal('2010-10-06 08:50:01.020')
    })
  })
  describe('Given no logger', () => {
    it('Should do nothing', () => {
      const logLevelPrefixMock = {
        apply: (logger, options) => null
      }
      const applySpy = sinon.spy(logLevelPrefixMock, 'apply')
      const prefixConfigurator = new LogLevelPrefixConfigurator({
        logLevelPrefix: logLevelPrefixMock,
        options: {}
      })

      prefixConfigurator.applyPrefix()

      expect(applySpy.called).to.be.false
    })
  })
})
