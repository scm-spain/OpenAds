import {expect} from 'chai'
import sinon from 'sinon'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_NO_BID} from '../../openads/domain/ad/adStatus'
import {POSITION_VISIBLE} from '../../openads/domain/position/positionStatus'
import AppNexusConnectorMock from './infrastructure/connector/AppNexusConnectorMock'

describe('Display Position use case', function() {
  describe('given a position segmentation data', function() {
    it('should return a Promise with a Domain Position and AppNexus data loaded and Position displayed in DOM', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          data: {
            adType: 'banner'
          }
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      openAds
        .addPosition({
          id: 'Ad1',
          name: 'ad number one',
          source: 'AppNexus',
          placement: 'es-cn-wph-ocasion-list-x_65',
          segmentation: {
            'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
            'es-sch-event_name': 'list',
            'aa-sch-country_code': 'es',
            'aa-sch-supply_type': 'wph',
            'es-sch-section': 'ocasion',
            'aa-sch-page_type': 'list',
            'es-sch-adformat': 'x65'
          },
          sizes: [[300, 250], [320, 250]]
        })
        .then(position => openAds.displayPosition({id: position.id}))
        .then(position => {
          expect(
            position.ad.status,
            `The ad status is equal to ${
              position.ad.status
            }, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          expect(
            position.ad.data.adType,
            `The ad adType is equal to ${
              position.ad.data.adType
            }, instead it should be equal to 'banner'`
          ).to.be.equals('banner')
          expect(
            position.status,
            `The position status is equal to ${
              position.status
            }, instead it should be equal to 'POSITION_VISIBLE'`
          ).to.be.equals(POSITION_VISIBLE)
          done()
        })
        .catch(error => done(error))
    })

    it('should return a rejected promise due a nonexistent position', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      openAds
        .displayPosition({id: 'id not found'})
        .then(position => {
          done(new Error("You shouldn't be here"))
        })
        .catch(error => {
          expect(
            error.name,
            `DisplayPosition return a rejected Promise, in this case, we expect an error with name: 'PositionNotFoundException', but we have received a ${
              error.name
            }`
          ).to.be.equals('PositionNotFoundException')
          done()
        })
    })

    it('should return a rejected promise with an error of type PositionAdIsNativeError', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          data: {
            adType: 'native'
          }
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      openAds
        .addPosition({
          id: 'Ad2',
          name: 'ad number one',
          source: 'AppNexus',
          placement: 'es-cn-wph-ocasion-list-x_65',
          segmentation: {
            'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
            'es-sch-event_name': 'list',
            'aa-sch-country_code': 'es',
            'aa-sch-supply_type': 'wph',
            'es-sch-section': 'ocasion',
            'aa-sch-page_type': 'list',
            'es-sch-adformat': 'x65'
          },
          sizes: [[300, 250], [320, 250]]
        })
        .then(position => openAds.displayPosition({id: position.id}))
        .then(position => done(new Error(`should be rejected! ${position.id}`)))
        .catch(error => {
          expect(
            error.name,
            `DisplayPosition return a rejected Promise, in this case, we expect an error with name: 'PositionAdIsNativeError', but we have received a ${
              error.name
            }`
          ).to.be.equals('PositionAdIsNativeError')
          expect(
            error.position.ad.data.adType,
            `The ad adType is equal to ${
              error.position.ad.data.adType
            }, instead it should be equal to 'native'`
          ).to.be.equals('native')
          done()
        })
    })

    it('should return a rejected promise with an error of type PositionAdNotAvailableError', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_NO_BID,
          data: {
            auctionId: '123456',
            nobid: true,
            tagId: 6051399
          }
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      openAds
        .addPosition({
          id: 'Ad2',
          name: 'ad number one',
          source: 'AppNexus',
          placement: 'es-cn-wph-ocasion-list-x_65',
          segmentation: {
            'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
            'es-sch-event_name': 'list',
            'aa-sch-country_code': 'es',
            'aa-sch-supply_type': 'wph',
            'es-sch-section': 'ocasion',
            'aa-sch-page_type': 'list',
            'es-sch-adformat': 'x65'
          },
          sizes: [[300, 250], [320, 250]]
        })
        .catch(error => openAds.displayPosition({id: error.position.id}))
        .then(position => done(new Error(`should be rejected! ${position.id}`)))
        .catch(error => {
          expect(
            error.name,
            `DisplayPosition return a rejected Promise, in this case, we expect an error with name: 'PositionAdNotAvailableError', but we have received a ${
              error.name
            }`
          ).to.be.equals('PositionAdNotAvailableError')
          expect(
            error.position.ad.data.nobid,
            `We expect and ad data nobid equals to 'true', instead of this we receive ${
              error.position.ad.data.nobid
            }`
          ).to.be.equals(true)
          expect(
            error.position.ad.status,
            `The ad status is equal to ${
              error.position.ad.status
            }, instead it should be equal to 'AD_NO_BID'`
          ).to.be.equals(AD_NO_BID)
          done()
        })
    })
  })
})
