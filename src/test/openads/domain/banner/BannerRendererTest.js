
import {expect} from 'chai'
import BannerRenderer from '../../../../openads/domain/ad/banner/BannerRenderer'

describe('BannerRenderer', () => {
  it('Should return an error calling to BannerRenderer#render instead of a extending class implementation', () => {
    const givenBannerRenderer = new BannerRenderer()
    expect(() => {
      givenBannerRenderer.render({})
    }).to.throw()
  })
})
