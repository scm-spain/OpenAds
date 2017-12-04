/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import AppNexusConnector from '../../../../../openads/infrastructure/connector/appnexus/AppNexusConnector'

describe('AppNexusConnector', () => {
  it('Should return an error calling to AppNexusConnector#activateDebugMode instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.activateDebugMode()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#setPageOpts instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.setPageOpts()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#onEvent instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.onEvent()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#defineTag instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.defineTag()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#loadTags instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.loadTags()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#showTag instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.showTag()
    }).to.throw()
  })
  it('Should return an error calling to AppNexusConnector#reset instead of a extending class implementation', () => {
    const givenAppNexusConnector = new AppNexusConnector()
    expect(() => {
      givenAppNexusConnector.reset()
    }).to.throw()
  })
})
