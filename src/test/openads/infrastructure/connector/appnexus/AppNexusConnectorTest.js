
import {expect} from 'chai'
import AppNexusConnector from '../../../../../openads/infrastructure/connector/appnexus/AppNexusConnector'

describe('AppNexusConnector', () => {
  const givenAppNexusConnector = new AppNexusConnector()
  it('Should return an error calling to AppNexusConnector#activateDebugMode instead of a extending class implementation', () => {
    expect(() => {
      givenAppNexusConnector.activateDebugMode()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#setPageOpts instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.setPageOpts({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
  it('Should return an error calling to AppNexusConnector#onEvent instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.onEvent({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
  it('Should return an error calling to AppNexusConnector#defineTag instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.defineTag({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
  it('Should return an error calling to AppNexusConnector#loadTags instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.loadTags({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
  it('Should return an error calling to AppNexusConnector#showTag instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.showTag({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
  it('Should return an error calling to AppNexusConnector#reset instead of a extending class implementation', (done) => {
    try {
      givenAppNexusConnector.reset({})
      done(new Error('Should throw an error'))
    } catch (err) {
      done()
    }
  })
})
