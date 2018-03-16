import {expect} from 'chai'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_BAD_REQUEST, AD_NO_BID} from '../../openads/infrastructure/connector/appnexus/event/events'
import AppNexusConnectorTest from './infrastructure/connector/AppNexusConnectorTest'
import {POSITION_VISIBLE} from '../../openads/domain/position/positionStatus'

describe('Display Position use case', function () {
  describe('given a position segmentation data', function () {
    it('should return a Promise with a Domain Position and AppNexus data loaded and Position displayed in DOM', function (done) {
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_AVAILABLE,
          data: {
            adType: 'banner',
            source: 'rtb',
            creativeId: 26299226,
            targetId: 'ad1',
            banner: {
              width: 728,
              height: 90,
              content: '<!-- Creative 26299226 served by Member 12345 via AppNexus --><a href="http://lax1.ib.adnxs.com/click?AAAAAAAA6D8AAAAAAADoPwAAAAAAAPA_AAAAAAAA6D8A…',
              trackers: [{
                impression_urls: ['http://lax1.ib.adnxs.com/it?e=wqT_3QK2BMAtAgAAAgDWAAUIo4aftQUQhaGP-8eK89JxG…S4xMy4xMzKoBO6QCbIEBwgAEAAY2AU.&s=7674360f6a0ea8c3ba7018acd3467ba291de4ad0']
              }]
            }
          }
        }
      })

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest
      })

      openAds.addPosition({
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
          expect(position.ad.status).to.be.equals(AD_AVAILABLE)
          expect(position.ad.data.adType).to.be.equals('banner')
          expect(position.status).to.be.equals(POSITION_VISIBLE)
          done()
        })
        .catch(error => done(error))
    })

    it('should return a rejected promise due a nonexistent position', function (done) {
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_BAD_REQUEST,
          data: {}
        }
      })
      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest
      })

      openAds.displayPosition({id: 'id not found'})
        .then(position => {
          done(new Error('You shouldn\'t be here'))
        })
        .catch(error => {
          expect(error.name).to.be.equals('PositionNotFoundException')
          done()
        })
    })

    it('should return a rejected promise with an error of type PositionAdIsNativeError', function (done) {
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_AVAILABLE,
          data: {
            adType: 'native',
            source: 'rtb'
          }
        }
      })

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest
      })

      openAds.addPosition({
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
          expect(error.name).to.be.equals('PositionAdIsNativeError')
          expect(error.position.ad.data.adType).to.be.equals('native')
          done()
        })
    })

    it('should return a rejected promise with an error of type PositionAdNotAvailableError', function (done) {
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_NO_BID,
          data: {
            auctionId: '123456',
            nobid: true,
            tagId: 6051399
          }
        }
      })

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest
      })

      openAds.addPosition({
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
          expect(error.name).to.be.equals('PositionAdNotAvailableError')
          expect(error.position.ad.data.nobid).to.be.equals(true)
          expect(error.position.ad.status).to.be.equals(AD_NO_BID)
          done()
        })
    })
  })
})