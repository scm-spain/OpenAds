import {expect} from 'chai'
import OpenAds from './infrastructure/bootstrap/index'
import {AD_AVAILABLE, AD_NO_BID} from '../../openads/domain/ad/adStatus'
import AppNexusConnectorTest from './infrastructure/connector/AppNexusConnectorTest'

describe('Refresh Position use case', function () {
  describe('given a position id', function () {
    it('should return a rejected promise with an error of type PositionNotFoundException', function (done) {
      const appnexusConnectorTest = new AppNexusConnectorTest({
        loadTags: {
          event: AD_AVAILABLE,
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

      openAds.refreshPosition({id: 'no id found'})
        .then(position => done(new Error('This shouldn\'t be called')))
        .catch(error => {
          expect(error.name, `RefreshPosition return a rejected Promise, in this case, we expect an error with name: 'PositionNotFoundException', but we have received a ${error.name}`).to.be.equals('PositionNotFoundException')
          done()
        })
    })

    it('should update the position with the new updated data', function (done) {
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

      const newSegmentation = {
        name: 'new name',
        placement: 'new placement',
        segmentation: {
          'es-sch-adformat': 'new adformat'
        },
        sizes: [[200, 150]]
      }

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
        .then(position => openAds.refreshPosition({id: position.id, position: newSegmentation}))
        .then(position => {
          expect(position.name, `Name is equal to ${position.name} and should be equal to ${newSegmentation.name}, ¿Are you sure that you have updated the previous value, with the new one?`).to.be.equals(newSegmentation.name)
          expect(position.placement, `Placement is equal to ${position.placement} and should be equal to ${newSegmentation.placement}, ¿Are you sure that you have updated the previous value, with the new one?`).to.be.equals(newSegmentation.placement)
          expect(position.segmentation, `Segmentation is equal to ${position.segmentation} and should be equal to ${newSegmentation.segmentation}, ¿Are you sure that you have updated the previous value, with the new one?`).to.be.equals(newSegmentation.segmentation)
          expect(position.sizes, `Sizes is equal to ${position.sizes} and should be equal to ${newSegmentation.sizes}, ¿Are you sure that you have updated the previous value, with the new one?`).to.be.equals(newSegmentation.sizes)
          expect(position.ad.status, `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          done()
        })
        .catch(error => done(error))
    })

    it('shouldn\'t update anything from the position but will refresh the ad response', function (done) {
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

      const newPosition = {
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
      }

      openAds.addPosition(newPosition)
        .then(position => openAds.refreshPosition({id: position.id}))
        .then(position => {
          expect(position.name, `Name is ${position.name} and should be ${newPosition.name}, perharps you forget to keep previous value in the update process?`).to.be.equals(newPosition.name)
          expect(position.placement, `Placement is ${position.placement} and should be ${newPosition.placement}, perharps you forget to keep previous value in the update process?`).to.be.equals(newPosition.placement)
          expect(position.segmentation, `Segmentation is ${position.segmentation} and should be ${newPosition.segmentation}, perharps you forget to keep previous value in the update process?`).to.be.equals(newPosition.segmentation)
          expect(position.sizes, `Sizes is ${position.sizes} and should be ${newPosition.sizes}, perhaps you forget to keep previous value in the update process?`).to.be.equals(newPosition.sizes)
          expect(position.ad.status, `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          done()
        })
        .catch(error => done(error))
    })

    it('should match after refreshPosition the previous ad with the new ad', function (done) {
      const loadTags = {
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

      const refresh = {
        event: AD_AVAILABLE,
        data: {
          adType: 'banner',
          source: 'rtb',
          creativeId: 42,
          targetId: 'ad1',
          banner: {
            width: 970,
            height: 90,
            content: '<!-- Creative 26299226 served by Member 12345 via AppNexus --><a href="http://lax1.ib.adnxs.com/click?AAAAAAAA6D8AAAAAAADoPwAAAAAAAPA_AAAAAAAA6D8A…',
            trackers: [{
              impression_urls: ['http://lax1.ib.adnxs.com/it?e=wqT_3QK2BMAtAgAAAgDWAAUIo4aftQUQhaGP-8eK89JxG…S4xMy4xMzKoBO6QCbIEBwgAEAAY2AU.&s=7674360f6a0ea8c3ba7018acd3467ba291de4ad0']
            }]
          }
        }
      }

      const appnexusConnectorTest = new AppNexusConnectorTest({loadTags, refresh})

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

      const newPosition = {
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
      }

      openAds.addPosition(newPosition)
        .then(position => {
          expect(position.ad.status, `The position ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          expect(position.ad.data.adType, `The position ad adType is equal to ${position.ad.data.adType}, instead it should be equal to ${loadTags.data.adType}`).to.be.equals(loadTags.data.adType)
          expect(position.ad.data.creativeId, `The position ad creativeId is equal to ${position.ad.data.creativeId}, instead it should be equal to ${loadTags.data.creativeId}`).to.be.equals(loadTags.data.creativeId)
          expect(position.ad.data.banner.width, `The position ad width is equal to ${position.ad.data.width}, instead it should be equal to ${loadTags.data.width}`).to.be.equals(loadTags.data.banner.width)
          expect(position.ad.data.banner.height, `The position ad height is equal to ${position.ad.data.height}, instead it should be equal to ${loadTags.data.height}`).to.be.equals(loadTags.data.banner.height)
          return position
        })
        .then(position => openAds.refreshPosition({id: position.id}))
        .then(position => {
          expect(position.ad.status, `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          expect(position.ad.data.adType, `The refreshed position ad adType should be ${refresh.data.adType}, instead of it is ${position.ad.data.adType}. Maybe you need to check the refreshPosition use case`).to.be.equals(refresh.data.adType)
          expect(position.ad.data.creativeId, `The refreshed position ad creativeId should be ${refresh.data.creativeId}, instead of it is ${position.ad.data.creativeId}. Maybe you need to check the refreshPosition use case`).to.be.equals(refresh.data.creativeId)
          expect(position.ad.data.banner.width, `The refreshed position ad width should be ${refresh.data.banner.width}, instead of it is ${position.ad.data.banner.width}. Maybe you need to check the refreshPosition use case`).to.be.equals(refresh.data.banner.width)
          expect(position.ad.data.banner.height, `The refreshed position ad height should be ${refresh.data.banner.height}, instead of it is ${position.ad.data.banner.height}. Maybe you need to check the refreshPosition use case`).to.be.equals(refresh.data.banner.height)
          done()
        })
        .catch(error => done(error))
    })

    it('should return ad not available after a refreshPosition of a previous position added', function (done) {
      const loadTags = {
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

      const refresh = {
        event: AD_NO_BID,
        data: {
          auctionId: '123456',
          nobid: true,
          tagId: 6051399
        }
      }

      const appnexusConnectorTest = new AppNexusConnectorTest({loadTags, refresh})

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

      const newPosition = {
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
      }

      openAds.addPosition(newPosition)
        .then(position => {
          expect(position.ad.status, `The ad status is equal to ${position.ad.status}, instead it should be equal to 'AD_AVAILABLE'`).to.be.equals(AD_AVAILABLE)
          expect(position.ad.data.adType, `The refreshed position ad adType should be ${position.ad.data.adType}, instead of it is ${position.ad.data.adType}. Maybe you need to check the refreshPosition use case`).to.be.equals(loadTags.data.adType)
          expect(position.ad.data.creativeId, `The refreshed position ad creativeId should be ${position.ad.data.creativeId}, instead of it is ${position.ad.data.creativeId}. Maybe you need to check the refreshPosition use case`).to.be.equals(loadTags.data.creativeId)
          expect(position.ad.data.banner.width, `The refreshed position ad width should be ${position.ad.data.banner.width}, instead of it is ${position.ad.data.banner.width}. Maybe you need to check the refreshPosition use case`).to.be.equals(loadTags.data.banner.width)
          expect(position.ad.data.banner.height, `The refreshed position ad height should be ${position.ad.data.banner.height}, instead of it is ${position.ad.data.banner.height}. Maybe you need to check the refreshPosition use case`).to.be.equals(loadTags.data.banner.height)
          return position
        })
        .then(position => openAds.refreshPosition({
          id: position.id,
          position: {
            placement: 'placement not found'
          }
        }))
        .then(position => done(new Error('should be rejected!')))
        .catch(error => {
          expect(error.name, `RefreshPosition return a rejected Promise, in this case, we expect an error with name: 'PositionAdNotAvailableError', but we have received a ${error.name}`).to.be.equals('PositionAdNotAvailableError')
          done()
        })
    })
  })
})
