
import {expect} from 'chai'
import Ad from '../../../openads/domain/ad/Ad'

describe('Ad', () => {
  it('Should return an error calling to Ad#show instead of a extending class implementation', () => {
    const givenAd = new Ad()
    expect(() => {
      givenAd.show()
    }).to.throw()
  })
})
