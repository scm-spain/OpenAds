import {expect} from 'chai'
import sinon from 'sinon'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_NO_BID} from '../../openads/domain/ad/adStatus'
import {POSITION_NOT_VISIBLE} from '../../openads/domain/position/positionStatus'
import AppNexusConnectorMock from './infrastructure/connector/AppNexusConnectorMock'

describe('Add Position use case', function () {
  describe('given a position segmentation data', function () {
    it('should return a Promise with a Domain Position and AppNexus data loaded', function (done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(Promise.resolve({
        status: AD_AVAILABLE,
        data: {
          adType: 'banner'
        }
      }))

      const openAds = OpenAds.init({
        config: {
          Sources: {
            'AppNexus': appNexusConnectorMock
          }
        }
      })

      openAds.addPosition({
        id: 'ad1',
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
        .then(position => {
          expect(position.ad.status, `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          expect(position.ad.data.adType, `The ad adType is equal to ${position.ad.data.adType}, instead it should be equal to 'banner'`).to.be.equals('banner')
          expect(position.status, `The position status is equal to ${position.status}, instead it should be equal to 'POSITION_NOT_VISIBLE'`).to.be.equals(POSITION_NOT_VISIBLE)
          done()
        })
        .catch(error => done(error))
    })

    it('should return a Rejected Promise with an PositionAdNotAvailableError', function (done) {
      const appnexusResponse = {
        response: 'Thor is the son of Odin'
      }

      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(Promise.resolve({
        status: AD_NO_BID,
        data: appnexusResponse
      }))

      const openAds = OpenAds.init({
        config: {
          Sources: {
            'AppNexus': appNexusConnectorMock
          }
        }
      })

      openAds.addPosition({
        id: 'ad1',
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
        .then(position => {
          done(new Error('should generate a rejected promise!'))
        })
        .catch(error => {
          expect(error.name, `AddPosition return a rejected Promise, in this case, we expect an error with name: 'PositionAdNotAvailableError', but we have received a ${error.name}`).to.be.equals('PositionAdNotAvailableError')
          expect(error.position.id, `AddPosition return a rejected Promise, in this case, we expect that the position id was: 'ad1', but we have received a position id ${error.position.id}`).to.be.equals('ad1')
          expect(error.position.ad.status, `The ad status is equal to ${error.position.ad.status}, instead it should be equal to 'AD_NO_BID'`).to.be.equals(AD_NO_BID)
          expect(error.position.ad.data).to.deep.equal(appnexusResponse)
          done()
        })
    })

    it('should call only one time loadAd from the connector', function (done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

      stubLoadAd.returns(Promise.resolve({
        status: AD_AVAILABLE,
        data: {
          adType: 'banner'
        }
      }))

      const openAds = OpenAds.init({
        config: {
          Sources: {
            'AppNexus': appNexusConnectorMock
          }
        }
      })

      openAds.addPosition({
        id: 'ad1',
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
        .then(() => {
          expect(stubLoadAd.calledOnce).to.be.true
          done()
        })
    })
  })
})
