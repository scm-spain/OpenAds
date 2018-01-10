/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import LoggerFactory from '../../../../openads/domain/logger/LoggerFactory'

describe('LoggerFactory', function () {
  it('Should return an error calling a non extended method #createLogger', function () {
    const loggerFactory = new LoggerFactory()
    expect(() => {
      loggerFactory.createLogger({name: 'whatever'})
    }).to.throw()
  })
})
