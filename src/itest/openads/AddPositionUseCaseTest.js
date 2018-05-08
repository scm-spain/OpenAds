import {expect} from 'chai'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_NO_BID} from '../../openads/infrastructure/connector/appnexus/event/events'
import AppNexusConnectorTest from './infrastructure/connector/AppNexusConnectorTest'
import {POSITION_NOT_VISIBLE} from '../../openads/domain/position/positionStatus'
import AppNexusClientMock from './infrastructure/connector/AppNexusClientMock'

describe('Add Position use case', function () {
  describe('given a position segmentation data', function () {
    it('should return a Promise with a Domain Position and AppNexus data loaded', function (done) {
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

      const appNexusClientMock = new AppNexusClientMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusClient: appNexusClientMock
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
        auctionId: '123456',
        nobid: true,
        tagId: 6051399
      }
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_NO_BID,
          data: appnexusResponse
        }
      })

      const appNexusClientMock = new AppNexusClientMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest,
        appNexusClient: appNexusClientMock
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

    it('should return just one call to appNexus loadTags', function (done) {
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

      const appNexusClientMock = new AppNexusClientMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest,
        appNexusClient: appNexusClientMock
      })

      const expectedNumberOfLoadTagsCalls = 1

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

      setTimeout(() => {
        expect(appnexusConnectorTest.numberOfCallsToLoadTags).is.equal(expectedNumberOfLoadTagsCalls)
        done()
      }, 200)
    })

    it('should return just one call to appNexus loadTags when we add a several positions', function (done) {
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

      const appNexusClientMock = new AppNexusClientMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest,
        appNexusClient: appNexusClientMock
      })

      const expectedNumberOfLoadTagsCalls = 1

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

      openAds.addPosition({
        id: 'ad2',
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

      openAds.addPosition({
        id: 'ad3',
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

      openAds.addPosition({
        id: 'ad4',
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

      openAds.addPosition({
        id: 'ad5',
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

      setTimeout(() => {
        expect(appnexusConnectorTest.numberOfCallsToLoadTags).is.equal(expectedNumberOfLoadTagsCalls)
        done()
      }, 200)
    })

    it('should return two calls to appNexus loadTags when we add a several positions and then add another one after the first time windows ends', function (done) {
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

      const appNexusClientMock = new AppNexusClientMock()

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: {
              Member: 3397
            }
          }
        },
        appNexusConnector: appnexusConnectorTest,
        appNexusClient: appNexusClientMock
      })

      const expectedNumberOfLoadTagsCalls = 2

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

      openAds.addPosition({
        id: 'ad2',
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

      openAds.addPosition({
        id: 'ad3',
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

      openAds.addPosition({
        id: 'ad4',
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

      openAds.addPosition({
        id: 'ad5',
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

      setTimeout(() => {
        openAds.addPosition({
          id: 'ad6',
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
      }, 30)

      setTimeout(() => {
        expect(appnexusConnectorTest.numberOfCallsToLoadTags).is.equal(expectedNumberOfLoadTagsCalls)
        done()
      }, 200)
    })
  })
})
