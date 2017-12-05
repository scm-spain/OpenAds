/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import DOMDriver from '../../../../openads/domain/service/DOMDriver'

describe('DOMDriver', () => {
  it('Should return an error calling to DOMDriver#getElementById instead of a extending class implementation', () => {
    const givenDOMDriver = new DOMDriver()
    expect(() => {
      givenDOMDriver.getElementById({})
    }).to.throw()
  })
  it('Should return an error calling to DOMDriver#getElementsByClassName instead of a extending class implementation', () => {
    const givenDOMDriver = new DOMDriver()
    expect(() => {
      givenDOMDriver.getElementsByClassName({})
    }).to.throw()
  })
  it('Should return an error calling to DOMDriver#getElementsByTagName instead of a extending class implementation', () => {
    const givenDOMDriver = new DOMDriver()
    expect(() => {
      givenDOMDriver.getElementsByTagName({})
    }).to.throw()
  })
  it('Should return an error calling to DOMDriver#writeElementById instead of a extending class implementation', () => {
    const givenDOMDriver = new DOMDriver()
    expect(() => {
      givenDOMDriver.writeElementById({})
    }).to.throw()
  })
  it('Should return an error calling to DOMDriver#createElement instead of a extending class implementation', () => {
    const givenDOMDriver = new DOMDriver()
    expect(() => {
      givenDOMDriver.createElement({})
    }).to.throw()
  })
})
