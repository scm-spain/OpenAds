import {expect} from 'chai'
import sinon from 'sinon'
import LogLevel from 'loglevel'
import LogLevelLogger from '../../../../openads/infrastructure/logger/LogLevelLogger'
import Logger from '../../../../openads/domain/logger/Logger'

describe('LogLevel Logger', function () {
  describe('When setting the log level', function () {
    it('Should set internal level to debug when DEBUG level is set', function () {
      const givenLogLevel = {
        setLevel: (level) => null
      }
      const givenLevel = Logger.LEVELS.DEBUG
      const spy = sinon.spy(givenLogLevel, 'setLevel')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.setLevel(givenLevel)
      expect(spy.args[0][0]).to.equal('debug')
    })
    it('Should set internal level to info when INFO level is set', function () {
      const givenLogLevel = {
        setLevel: (level) => null
      }
      const givenLevel = Logger.LEVELS.INFO
      const spy = sinon.spy(givenLogLevel, 'setLevel')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.setLevel(givenLevel)
      expect(spy.args[0][0]).to.equal('info')
    })
    it('Should set internal level to warn when WARN level is set', function () {
      const givenLogLevel = {
        setLevel: (level) => null
      }
      const givenLevel = Logger.LEVELS.WARN
      const spy = sinon.spy(givenLogLevel, 'setLevel')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.setLevel(givenLevel)
      expect(spy.args[0][0]).to.equal('warn')
    })
    it('Should set internal level to error when ERROR level is set', function () {
      const givenLogLevel = {
        setLevel: (level) => null
      }
      const givenLevel = Logger.LEVELS.ERROR
      const spy = sinon.spy(givenLogLevel, 'setLevel')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.setLevel(givenLevel)
      expect(spy.args[0][0]).to.equal('error')
    })
    it('Should set internal level to silent when no debug,info,warn,error level is set', function () {
      const givenLogLevel = {
        setLevel: (level) => null
      }
      const givenLevel = 'anyother'
      const spy = sinon.spy(givenLogLevel, 'setLevel')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.setLevel(givenLevel)
      expect(spy.args[0][0]).to.equal('silent')
    })
  })
  describe('When logging a debug messages', function () {
    it('Should call internal debug method', function () {
      const givenLogLevel = {
        debug: (message) => null
      }
      const spy = sinon.spy(givenLogLevel, 'debug')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.debug('a', 'debug', 'message')
      expect(spy.args[0].length).to.equal(3)
    })
  })
  describe('When logging a info messages', function () {
    it('Should call internal info method', function () {
      const givenLogLevel = {
        info: (message) => null
      }
      const spy = sinon.spy(givenLogLevel, 'info')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.info('a', 'info', 'message')
      expect(spy.args[0].length).to.equal(3)
    })
  })
  describe('When logging a warn messages', function () {
    it('Should call internal warn method', function () {
      const givenLogLevel = {
        warn: (message) => null
      }
      const spy = sinon.spy(givenLogLevel, 'warn')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.warn('a', 'warn', 'message')
      expect(spy.args[0].length).to.equal(3)
    })
  })
  describe('When logging a error messages', function () {
    it('Should call internal error method', function () {
      const givenLogLevel = {
        error: (message) => null
      }
      const spy = sinon.spy(givenLogLevel, 'error')
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      logger.error('a', 'error', 'message')
      expect(spy.args[0].length).to.equal(3)
    })
  })
  describe('When getting debug to be enabled', function () {
    it('Should return true if internal level is set to debug', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.DEBUG
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isDebugEnabled()).to.be.true
    })
    it('Should return false if internal level is set to higher than debug', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.INFO
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isDebugEnabled()).to.be.false
    })
  })
  describe('When getting info to be enabled', function () {
    it('Should return true if internal level is set to info', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.INFO
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isInfoEnabled()).to.be.true
    })
    it('Should return false if internal level is set to higher than info', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.WARN
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isInfoEnabled()).to.be.false
    })
  })
  describe('When getting warn to be enabled', function () {
    it('Should return true if internal level is set to warn', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.WARN
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isWarnEnabled()).to.be.true
    })
    it('Should return false if internal level is set to higher than warn', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.ERROR
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isWarnEnabled()).to.be.false
    })
  })
  describe('When getting error to be enabled', function () {
    it('Should return true if internal level is set to error', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.ERROR
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isErrorEnabled()).to.be.true
    })
    it('Should return false if internal level is set to higher than error', function () {
      const givenLogLevel = {
        getLevel: () => LogLevel.levels.SILENT
      }
      const logger = new LogLevelLogger({logLevel: givenLogLevel})
      expect(logger.isErrorEnabled()).to.be.false
    })
  })
})
