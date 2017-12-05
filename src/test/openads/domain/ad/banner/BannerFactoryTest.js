import BannerFactory from '../../../../../openads/domain/ad/banner/BannerFactory'

describe('BannerFactory test', () => {
  it('Should throw an error when source is not defined', (done) => {
    const givenSource = 'unknown'
    const bannerFactory = new BannerFactory({})

    try {
      bannerFactory.create({source: givenSource})
      done(new Error('Should throw an error.'))
    } catch (err) {
      done()
    }
  })
})
