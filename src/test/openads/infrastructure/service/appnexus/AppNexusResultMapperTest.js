import {expect} from 'chai'
import AppNexusResultMapper from '../../../../../openads/infrastructure/service/appnexus/AppNexusResultMapper'
import BannerFactory from '../../../../../openads/domain/ad/banner/BannerFactory'
import Banner from '../../../../../openads/domain/ad/banner/Banner'
import Size from '../../../../../openads/domain/ad/Size'

describe('AppNexus result mapper', function () {
  describe('given a banner reponse type from AppNexus', function () {
    it('should return a Banner domain object', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        bannerFactory: new BannerFactory({
          appNexusBannerRenderer: {}
        })
      })

      const givenContent = '<html></html>'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'banner'
      const banner = appNexusResultMapper.mapResponseToDomain({
        appNexusResponse: {
          targetId: givenTargetId,
          adType: givenAdType,
          banner: {
            content: givenContent
          },
          width: 400,
          height: 500
        }
      })

      expect(banner).to.be.an.instanceof(Banner)
      expect(banner.size).to.be.an.instanceof(Size)
      expect(banner.size.width).to.be.equals(400)
      expect(banner.size.height).to.be.equals(500)
      expect(banner.content).to.be.equals(givenContent)
      expect(banner.containerId).to.be.equals(givenTargetId)
    })
  })

  describe('given any different reponse type of banner from AppNexus', function () {
    it('should return an exception', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        bannerFactory: new BannerFactory({
          appNexusBannerRenderer: {}
        })
      })

      const givenContent = '<html></html>'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'native'

      expect(appNexusResultMapper.mapResponseToDomain.bind(appNexusResultMapper, {
        appNexusResponse: {
          targetId: givenTargetId,
          adType: givenAdType,
          banner: {
            content: givenContent
          },
          width: 400,
          height: 500
        }
      })).to.throw('AdType not supported: ' + givenAdType)
    })
  })
})