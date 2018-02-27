import OpenAds from '../openads/infrastructure/bootstrap/index'

const openAds = OpenAds.init({config: {
  Sources: {
    AppNexus: {
      Member: 3397
    }
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
  .then(top1 => top1.ad)
  .then(adResponse => openAds.displayPosition({id: 'ad1'}))
  .catch(error => console.log(error))

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
  .then(top2 => top2.ad)
  .then(top2 => openAds.displayPosition({id: 'ad2'}))
  .catch(error => console.log(error))
