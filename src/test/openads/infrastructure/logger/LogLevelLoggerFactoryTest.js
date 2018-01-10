import {expect} from 'chai'
import sinon from 'sinon'
import LogLevelLoggerFactory from '../../../../openads/infrastructure/logger/LogLevelLoggerFactory'
import LogLevelLogger from '../../../../openads/infrastructure/logger/LogLevelLogger'

describe('LogLevelLoggerFactory', function () {
  describe('Given a valid LogLevel and prefixer instances', function () {
    it('Should create a named logger with error level and default prefix options if no options are set', function () {
      const logger = {
        setLevel: function (level) {}
      }
      const givenLogLevelInstance = {
        getLogger: function (name) {
          return logger
        }
      }
      const givenLogLevelPrefixerInstance = {
        apply: function (logger, options) {}
      }
      const logLevelInstanceGetLoggerSpy = sinon.spy(givenLogLevelInstance, 'getLogger')
      const loggerSetLevelSpy = sinon.spy(logger, 'setLevel')
      const logLevelPrefixerInstanceApplySpy = sinon.spy(givenLogLevelPrefixerInstance, 'apply')
      const logLevelFactory = new LogLevelLoggerFactory({
        logLevelInstance: givenLogLevelInstance,
        logMessagePrefixInstance: givenLogLevelPrefixerInstance
      })
      const openAdsLogger = logLevelFactory.createLogger({name: 'OpenAds'})
      expect(openAdsLogger).to.be.an.instanceOf(LogLevelLogger)
      expect(logLevelInstanceGetLoggerSpy.calledOnce).to.be.true
      expect(logLevelInstanceGetLoggerSpy.args[0][0]).to.equal('OpenAds')
      expect(logLevelPrefixerInstanceApplySpy.calledOnce).to.be.true
      expect(logLevelPrefixerInstanceApplySpy.args[0][1].template).to.not.undefined
      expect(logLevelPrefixerInstanceApplySpy.args[0][1].timestampFormatter).to.not.undefined
      expect(loggerSetLevelSpy.calledOnce).to.be.true
      expect(loggerSetLevelSpy.args[0][0]).to.equal('error')
    })
    it('Should use custom level and custom prefix options if options are set', function () {
      const logger = {
        setLevel: function (level) {}
      }
      const givenLogLevelInstance = {
        getLogger: function (name) {
          return logger
        }
      }
      const givenLogLevelPrefixerInstance = {
        apply: function (logger, options) {}
      }
      const loggerSetLevelSpy = sinon.spy(logger, 'setLevel')
      const logLevelPrefixerInstanceApplySpy = sinon.spy(givenLogLevelPrefixerInstance, 'apply')
      const givenOptions = {
        Level: 'debug',
        PrefixOptions: {
          template: '%n'
        }
      }
      const logLevelFactory = new LogLevelLoggerFactory({
        logLevelInstance: givenLogLevelInstance,
        logMessagePrefixInstance: givenLogLevelPrefixerInstance,
        loggerConfig: givenOptions
      })
      logLevelFactory.createLogger({name: 'OpenAds'})
      expect(loggerSetLevelSpy.args[0][0]).to.equal(givenOptions.Level)
      expect(logLevelPrefixerInstanceApplySpy.args[0][1].template).to.equal(givenOptions.PrefixOptions.template)
      expect(logLevelPrefixerInstanceApplySpy.args[0][1].timestampFormatter).to.not.undefined
    })
  })
  it('Should return a default prefix template with timestamp, level and logger name format', function () {
    const logLevelFactory = new LogLevelLoggerFactory()
    const template = logLevelFactory._defaultPrefixTemplate()
    expect(template).to.equal('[%t] %l | %n:')
  })
  it('Should return a default timestamp formatter with date to YYYY-MM-DD HH:mm:ss.zzz conversion', function () {
    const givenDate = new Date(2010, 10, 6, 8, 50, 1, 20)
    const logLevelFactory = new LogLevelLoggerFactory()
    const formatter = logLevelFactory._defaultPrefixTimestampFormatter()
    const formattedDate = formatter(givenDate)
    expect(formattedDate).to.equal('2010-10-06 08:50:01.020')
  })
})
