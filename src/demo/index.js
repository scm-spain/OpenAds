import OpenAds from '../openads/infrastructure/bootstrap/index'
import AdConnector from '@schibstedspain/openads-appnexus'

const appNexusConnector = new AdConnector({
  configuration: {
    member: 3397
  }
})

console.log(appNexusConnector.id())
appNexusConnector.loadAd({
  domElementId: 'ad1',
  placement: 'es-cn-wph-ocasion-list-x_65',
  sizes: [[300, 250], [320, 250]],
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wph',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'x65'
  }
})
  .then(ad => console.log(ad))

const openAds = OpenAds.init({config: {
  Sources: [appNexusConnector]
}})

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
  .then(position => openAds.displayPosition({id: position.id}))

openAds.addPosition({
  id: 'ad2',
  name: 'ad number two',
  source: 'AppNexus',
  placement: 'es-cn-wde-ocasion-list-top_2',
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wde',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'top2'
  },
  sizes: [[728, 90], [1, 1], [728, 161]]
})
  .then(position => openAds.displayPosition({id: position.id}))

openAds.addPosition({
  id: 'ad_refresh',
  name: 'ad_error',
  source: 'AppNexus',
  placement: 'placement_not_found',
  segmentation: {
    'es-sch-ads_name_page': 'segmentation/not/found'
  },
  sizes: [[300, 250], [320, 250]]
})
  .then(position => openAds.displayPosition({id: position.id}))
  .catch(error =>
    openAds.refreshPosition({
      id: 'ad_refresh',
      position: {
        name: 'new name',
        placement: 'es-cn-wde-ocasion-list-top_2',
        segmentation: {
          'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
          'es-sch-event_name': 'list',
          'aa-sch-country_code': 'es',
          'aa-sch-supply_type': 'wde',
          'es-sch-section': 'ocasion',
          'aa-sch-page_type': 'list',
          'es-sch-adformat': 'top2'
        },
        sizes: [[728, 90], [1, 1], [728, 161]]
      }
    })
      .then(position => openAds.displayPosition({id: position.id}))
  )

openAds.addPosition({
  id: 'ad3',
  name: 'ad number two',
  source: 'AppNexus',
  placement: 'es-cn-wde-ocasion-list-top_2',
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wde',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'top2'
  },
  sizes: [[728, 90], [1, 1], [728, 161]]
})
  .then(position => openAds.displayPosition({id: position.id}))

setInterval(() => openAds.refreshPosition({id: 'ad3'}), 5000)
