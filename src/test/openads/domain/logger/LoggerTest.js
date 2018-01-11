import {expect} from 'chai'
import Logger from '../../../../openads/domain/logger/Logger'

describe('Logger', function () {
  it('Should return an error calling a non extended method #debug', function () {
    const logger = new Logger()
    expect(() => {
      logger.debug()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #isDebugEnabled', function () {
    const logger = new Logger()
    expect(() => {
      logger.isDebugEnabled()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #info', function () {
    const logger = new Logger()
    expect(() => {
      logger.info()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #isInfoEnabled', function () {
    const logger = new Logger()
    expect(() => {
      logger.isInfoEnabled()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #warn', function () {
    const logger = new Logger()
    expect(() => {
      logger.warn()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #isWarnEnabled', function () {
    const logger = new Logger()
    expect(() => {
      logger.isWarnEnabled()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #error', function () {
    const logger = new Logger()
    expect(() => {
      logger.error()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #isErrorEnabled', function () {
    const logger = new Logger()
    expect(() => {
      logger.isErrorEnabled()
    }).to.throw()
  })
  it('Should return an error calling a non extended method #setLevel', function () {
    const logger = new Logger()
    expect(() => {
      logger.setLevel('debug')
    }).to.throw()
  })
  it('Should return the allowed log levels', function () {
    const levels = Logger.LEVELS
    expect(levels.DEBUG).to.equal('debug')
    expect(levels.INFO).to.equal('info')
    expect(levels.WARN).to.equal('warn')
    expect(levels.ERROR).to.equal('error')
    expect(levels.OFF).to.equal('off')
  })
})
