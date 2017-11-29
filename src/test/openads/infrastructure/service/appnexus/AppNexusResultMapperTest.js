import {expect} from 'chai'
import AppNexusResultMapper from '../../../../../openads/infrastructure/service/appnexus/AppNexusResultMapper'
import BannerFactory from '../../../../../openads/domain/ad/banner/BannerFactory'
import Banner from '../../../../../openads/domain/ad/banner/Banner'
import Size from '../../../../../openads/domain/ad/Size'
import Native from '../../../../../openads/domain/ad/native/Native'
import NativeFactory from '../../../../../openads/domain/ad/native/NativeFactory'

describe('AppNexus result mapper', function () {
  describe('given a banner reponse type from AppNexus', function () {
    it('should return a Banner domain object', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        bannerFactory: new BannerFactory({
          appNexusBannerRenderer: {}
        })
      })

      const givenContent = '<html></html>'
      const givenPosition = 'da_position'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'banner'
      const banner = appNexusResultMapper.mapResponseToDomain({
        position: givenPosition,
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
      expect(banner.position).to.be.equals(givenPosition)
    })
  })

  describe('given a video reponse type from AppNexus', function () {
    it('should return a Banner domain object', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        bannerFactory: new BannerFactory({
          appNexusBannerRenderer: {}
        })
      })

      const givenContent = '<html></html>'
      const givenPosition = 'da_position'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'video'
      const banner = appNexusResultMapper.mapResponseToDomain({
        position: givenPosition,
        appNexusResponse: {
          targetId: givenTargetId,
          adType: givenAdType,
          video: {
            content: givenContent
          }
        }
      })

      expect(banner).to.be.an.instanceof(Banner)
      expect(banner.content).to.be.equals(givenContent)
      expect(banner.containerId).to.be.equals(givenTargetId)
      expect(banner.position).to.be.equals(givenPosition)
    })
  })

  describe('given a native reponse type from AppNexus', function () {
    it('should return a Native domain object', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        nativeFactory: new NativeFactory({
          nativeRendererProcessor: { getRenderer: () => {} }
        })
      })

      const givenJson = {a: 'json'}
      const givenPosition = 'da_position'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'native'
      const banner = appNexusResultMapper.mapResponseToDomain({
        position: givenPosition,
        appNexusResponse: {
          targetId: givenTargetId,
          adType: givenAdType,
          native: givenJson
        }
      })

      expect(banner).to.be.an.instanceof(Native)
      expect(banner.json).to.deep.equal(givenJson)
      expect(banner.containerId).to.be.equals(givenTargetId)
      expect(banner.position).to.be.equals(givenPosition)
    })
  })

  describe('given any unknown reponse type from AppNexus', function () {
    it('should return an exception', function () {
      const appNexusResultMapper = new AppNexusResultMapper({
        bannerFactory: new BannerFactory({
          appNexusBannerRenderer: {}
        })
      })

      const givenContent = '<html></html>'
      const givenTargetId = 'pepe_id'
      const givenAdType = 'whatever'

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
