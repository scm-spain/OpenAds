import OpenAds from '../openads/infrastructure/bootstrap/index'
import AppNexusConnector from '@schibstedspain/openads-appnexus'

const appNexusConnector = new AppNexusConnector({
  source: 'AppNexus',
  member: 3397
})

const appNexusConnectorPro = new AppNexusConnector({
  source: 'AppNexus-pro',
  member: 3296
})

const openAds = OpenAds.init({config: {
  Sources: {
    'AppNexus': appNexusConnector,
    'AppNexus-pro': appNexusConnectorPro
  }
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
  source: 'AppNexus-pro',
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
