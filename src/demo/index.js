import OpenAds from '../openads/infrastructure/bootstrap/index'

const openAds = OpenAds.init({config: {
  Sources: {
    AppNexus: {
      Member: 3397
    }
  }
}})

openAds.addPosition({
  id: 'PubTop1',
  name: 'Top1',
  source: 'appnexus',
  placement: 'es-cn-wde-ocasion-list-top_1',
  segmentation: {
    'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
    'es-sch-event_name': 'list',
    'aa-sch-country_code': 'es',
    'aa-sch-supply_type': 'wde',
    'es-sch-section': 'ocasion',
    'aa-sch-page_type': 'list',
    'es-sch-adformat': 'top1'
  },
  sizes: [[970, 90], [980, 90], [728, 90], [980, 250]]
})

openAds.addPosition({
  id: 'PubTop2',
  name: 'Top2',
  source: 'appnexus',
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

openAds.displayPosition({id: 'PubTop1'})
openAds.displayPosition({id: 'PubTop2'})
