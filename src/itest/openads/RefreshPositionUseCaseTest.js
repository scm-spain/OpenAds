import {expect} from 'chai'
import sinon from 'sinon'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_NO_BID} from '../../openads/domain/ad/adStatus'
import AppNexusConnectorMock from './infrastructure/connector/AppNexusConnectorMock'

describe('Refresh Position use case', function() {
  describe('given a position id', function() {
    it('should return a rejected promise with an error of type PositionNotFoundException', function(done) {
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
        .refreshPosition({id: 'no id found'})
        .then(position => done(new Error("This shouldn't be called")))
        .catch(error => {
          expect(
            error.name,
            `RefreshPosition return a rejected Promise, in this case, we expect an error with name: 'PositionNotFoundException', but we have received a ${error.name}`
          ).to.be.equals('PositionNotFoundException')
          done()
        })
    })

    it('should update the position with the new updated data', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')
      const stubRefresh = sinon.stub(appNexusConnectorMock, 'refresh')

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          data: {
            adType: 'banner'
          }
        })
      )

      stubRefresh.returns(
        Promise.resolve({
          status: AD_AVAILABLE
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      const newSpecification = {
        source: 'AppNexus',
        appnexus: {
          placement: 'the-x77-placement',
          segmentation: {
            'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
            'es-sch-event_name': 'list',
            'aa-sch-country_code': 'es',
            'aa-sch-supply_type': 'wph',
            'es-sch-section': 'ocasion',
            'aa-sch-page_type': 'list',
            'es-sch-adformat': 'x77'
          },
          sizes: [[200, 150]]
        }
      }

      openAds
        .addPosition({
          id: 'ad1',
          name: 'ad number one',
          specification: {
            source: 'AppNexus',
            appnexus: {
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
              sizes: [
                [300, 250],
                [320, 250]
              ]
            }
          }
        })
        .then(position =>
          openAds.refreshPosition({
            id: position.id,
            specification: newSpecification
          })
        )
        .then(position => {
          expect(
            position.specification,
            'specification has not changed properly'
          ).to.deep.equals(newSpecification)
          expect(
            position.ad.status,
            `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          done()
        })
        .catch(error => done(error))
    })

    it("shouldn't update anything from the position but will refresh the ad response", function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')
      const stubRefresh = sinon.stub(appNexusConnectorMock, 'refresh')

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          data: {
            adType: 'banner'
          }
        })
      )

      stubRefresh.returns(
        Promise.resolve({
          status: AD_AVAILABLE
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      const newPosition = {
        id: 'ad1',
        name: 'ad number one',
        specification: {
          source: 'AppNexus',
          appnexus: {
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
            sizes: [
              [300, 250],
              [320, 250]
            ]
          }
        }
      }

      openAds
        .addPosition(newPosition)
        .then(position => openAds.refreshPosition({id: position.id}))
        .then(position => {
          expect(
            position.specification,
            'specification must not be updated'
          ).to.deep.equals(newPosition.specification)
          expect(
            position.ad.status,
            `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          done()
        })
        .catch(error => done(error))
    })

    it('should match after refreshPosition the previous ad with the new ad', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')
      const stubRefresh = sinon.stub(appNexusConnectorMock, 'refresh')

      const loadAdData = {
        data: {
          adType: 'banner',
          source: 'rtb',
          creativeId: 26299226,
          targetId: 'ad1',
          banner: {
            width: 728,
            height: 90,
            content:
              '<!-- Creative 26299226 served by Member 12345 via AppNexus --><a href="http://lax1.ib.adnxs.com/click?AAAAAAAA6D8AAAAAAADoPwAAAAAAAPA_AAAAAAAA6D8A…',
            trackers: [
              {
                impression_urls: [
                  'http://lax1.ib.adnxs.com/it?e=wqT_3QK2BMAtAgAAAgDWAAUIo4aftQUQhaGP-8eK89JxG…S4xMy4xMzKoBO6QCbIEBwgAEAAY2AU.&s=7674360f6a0ea8c3ba7018acd3467ba291de4ad0'
                ]
              }
            ]
          }
        }
      }

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          ...loadAdData
        })
      )

      const refreshData = {
        data: {
          adType: 'banner',
          source: 'rtb',
          creativeId: 42,
          targetId: 'ad1',
          banner: {
            width: 970,
            height: 90,
            content:
              '<!-- Creative 26299226 served by Member 12345 via AppNexus --><a href="http://lax1.ib.adnxs.com/click?AAAAAAAA6D8AAAAAAADoPwAAAAAAAPA_AAAAAAAA6D8A…',
            trackers: [
              {
                impression_urls: [
                  'http://lax1.ib.adnxs.com/it?e=wqT_3QK2BMAtAgAAAgDWAAUIo4aftQUQhaGP-8eK89JxG…S4xMy4xMzKoBO6QCbIEBwgAEAAY2AU.&s=7674360f6a0ea8c3ba7018acd3467ba291de4ad0'
                ]
              }
            ]
          }
        }
      }

      stubRefresh.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          ...refreshData
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      const newPosition = {
        id: 'ad1',
        name: 'ad number one',
        specification: {
          source: 'AppNexus',
          appnexus: {
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
            sizes: [
              [300, 250],
              [320, 250]
            ]
          }
        }
      }

      openAds
        .addPosition(newPosition)
        .then(position => {
          expect(
            position.ad.status,
            `The position ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          expect(
            position.ad.data.adType,
            `The position ad adType is equal to ${position.ad.data.adType}, instead it should be equal to ${loadAdData.data.adType}`
          ).to.be.equals(loadAdData.data.adType)
          expect(
            position.ad.data.creativeId,
            `The position ad creativeId is equal to ${position.ad.data.creativeId}, instead it should be equal to ${loadAdData.data.creativeId}`
          ).to.be.equals(loadAdData.data.creativeId)
          expect(
            position.ad.data.banner.width,
            `The position ad width is equal to ${position.ad.data.width}, instead it should be equal to ${loadAdData.data.width}`
          ).to.be.equals(loadAdData.data.banner.width)
          expect(
            position.ad.data.banner.height,
            `The position ad height is equal to ${position.ad.data.height}, instead it should be equal to ${loadAdData.data.height}`
          ).to.be.equals(loadAdData.data.banner.height)
          return position
        })
        .then(position => openAds.refreshPosition({id: position.id}))
        .then(position => {
          expect(
            position.ad.status,
            `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          expect(
            position.ad.data.adType,
            `The refreshed position ad adType should be ${refreshData.data.adType}, instead of it is ${position.ad.data.adType}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(refreshData.data.adType)
          expect(
            position.ad.data.creativeId,
            `The refreshed position ad creativeId should be ${refreshData.data.creativeId}, instead of it is ${position.ad.data.creativeId}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(refreshData.data.creativeId)
          expect(
            position.ad.data.banner.width,
            `The refreshed position ad width should be ${refreshData.data.banner.width}, instead of it is ${position.ad.data.banner.width}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(refreshData.data.banner.width)
          expect(
            position.ad.data.banner.height,
            `The refreshed position ad height should be ${refreshData.data.banner.height}, instead of it is ${position.ad.data.banner.height}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(refreshData.data.banner.height)
          done()
        })
        .catch(error => done(error))
    })

    it('should return ad not available after a refreshPosition of a previous position added', function(done) {
      const appNexusConnectorMock = new AppNexusConnectorMock()

      const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')
      const stubRefresh = sinon.stub(appNexusConnectorMock, 'refresh')

      const loadAdData = {
        data: {
          adType: 'banner',
          source: 'rtb',
          creativeId: 26299226,
          targetId: 'ad1',
          banner: {
            width: 728,
            height: 90,
            content:
              '<!-- Creative 26299226 served by Member 12345 via AppNexus --><a href="http://lax1.ib.adnxs.com/click?AAAAAAAA6D8AAAAAAADoPwAAAAAAAPA_AAAAAAAA6D8A…',
            trackers: [
              {
                impression_urls: [
                  'http://lax1.ib.adnxs.com/it?e=wqT_3QK2BMAtAgAAAgDWAAUIo4aftQUQhaGP-8eK89JxG…S4xMy4xMzKoBO6QCbIEBwgAEAAY2AU.&s=7674360f6a0ea8c3ba7018acd3467ba291de4ad0'
                ]
              }
            ]
          }
        }
      }

      stubLoadAd.returns(
        Promise.resolve({
          status: AD_AVAILABLE,
          ...loadAdData
        })
      )

      const refreshData = {
        data: {
          auctionId: '123456',
          nobid: true,
          tagId: 6051399
        }
      }

      stubRefresh.returns(
        Promise.resolve({
          status: AD_NO_BID,
          ...refreshData
        })
      )

      const openAds = OpenAds.init({
        config: {
          Sources: {
            AppNexus: appNexusConnectorMock
          }
        }
      })

      const newPosition = {
        id: 'ad1',
        name: 'ad number one',
        specification: {
          source: 'AppNexus',
          appnexus: {
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
            sizes: [
              [300, 250],
              [320, 250]
            ]
          }
        }
      }

      const updatedSpecification = {
        source: 'AppNexus',
        appnexus: {
          placement: 'does-not-exist'
        }
      }

      openAds
        .addPosition(newPosition)
        .then(position => {
          expect(
            position.ad.status,
            `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`
          ).to.be.equals(AD_AVAILABLE)
          expect(
            position.ad.data.adType,
            `The refreshed position ad adType should be ${position.ad.data.adType}, instead of it is ${position.ad.data.adType}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(loadAdData.data.adType)
          expect(
            position.ad.data.creativeId,
            `The refreshed position ad creativeId should be ${position.ad.data.creativeId}, instead of it is ${position.ad.data.creativeId}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(loadAdData.data.creativeId)
          expect(
            position.ad.data.banner.width,
            `The refreshed position ad width should be ${position.ad.data.banner.width}, instead of it is ${position.ad.data.banner.width}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(loadAdData.data.banner.width)
          expect(
            position.ad.data.banner.height,
            `The refreshed position ad height should be ${position.ad.data.banner.height}, instead of it is ${position.ad.data.banner.height}. Maybe you need to check the refreshPosition use case`
          ).to.be.equals(loadAdData.data.banner.height)
          return position
        })
        .then(position =>
          openAds.refreshPosition({
            id: position.id,
            specification: updatedSpecification
          })
        )
        .then(position => done(new Error('should be rejected!')))
        .catch(error => {
          expect(
            error.name,
            `RefreshPosition return a rejected Promise, in this case, we expect an error with name: 'PositionAdNotAvailableError', but we have received a ${error.name}`
          ).to.be.equals('PositionAdNotAvailableError')
          done()
        })
    })
  })
})
