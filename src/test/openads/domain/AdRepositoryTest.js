/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import AdRepository from '../../../openads/domain/ad/AdRepository'

describe('AdRepository', () => {
  it('Should return an error calling to AdRepository#findAd instead of a extending class implementation', () => {
    const givenAdRepository = new AdRepository()
    expect(() => {
      givenAdRepository.findAd({})
    }).to.throw()
  })
  it('Should return an error calling to AdRepository#reset instead of a extending class implementation', () => {
    const givenAdRepository = new AdRepository()
    expect(() => {
      givenAdRepository.reset()
    }).to.throw()
  })
})
