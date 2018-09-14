import sinon from 'sinon'
import AppNexusConnectorMock from '../openads/infrastructure/connector/AppNexusConnectorMock'
import {AD_AVAILABLE} from '../../openads/domain/ad/adStatus'
import BootstrapPerformance from '../openads/infrastructure/bootstrap/BootstrapPerformance'
import {printTimelineChart} from '@s-ui/perf/lib/chart'
import getPerf from '@s-ui/perf'

const appNexusConnectorMock = new AppNexusConnectorMock()
const stubLoadAd = sinon.stub(appNexusConnectorMock, 'loadAd')

stubLoadAd.returns(Promise.resolve({
  status: AD_AVAILABLE,
  data: {
    adType: 'banner'
  }
}))

const addPosition = () => {
  const performance = getPerf(`${addPosition.name}_id`)
  performance.mark(addPosition.name)
  const openAds = BootstrapPerformance.init({
    config: {
      Sources: {
        'AppNexus': appNexusConnectorMock
      }
    },
    performance
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
    .then(x => performance.stop(addPosition.name))
    .then(x => performance.getEntries())
    .then(printTimelineChart())
}

const displayNonexistentPosition = () => {
  const performance = getPerf(`${displayNonexistentPosition.name}_id`)
  performance.mark(displayNonexistentPosition.name)
  const openAds = BootstrapPerformance.init({
    config: {
      Sources: {
        'AppNexus': appNexusConnectorMock
      }
    },
    performance
  })

  openAds.displayPosition({id: 'non_existent'})
    .catch(error => error)
    .then(x => performance.stop(displayNonexistentPosition.name))
    .then(x => performance.getEntries())
    .then(printTimelineChart())
}

const refreshNonexistentPosition = () => {
  const performance = getPerf(`${refreshNonexistentPosition.name}_id`)
  performance.mark(refreshNonexistentPosition.name)
  const openAds = BootstrapPerformance.init({
    config: {
      Sources: {
        'AppNexus': appNexusConnectorMock
      }
    },
    performance
  })

  openAds.refreshPosition({id: 'non_existent', position: {}})
    .catch(error => error)
    .then(x => performance.stop(refreshNonexistentPosition.name))
    .then(x => performance.getEntries())
    .then(printTimelineChart())
}

const addPositionAndDisplay = () => {
  const performance = getPerf(`${addPositionAndDisplay.name}_id`)
  performance.mark(addPositionAndDisplay.name)
  const openAds = BootstrapPerformance.init({
    config: {
      Sources: {
        'AppNexus': appNexusConnectorMock
      }
    },
    performance
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
    .then(position => openAds.displayPosition({id: position.id}))
    .then(x => performance.stop(addPositionAndDisplay.name))
    .then(x => performance.getEntries())
    .then(printTimelineChart())
}

const addPositionAndDisplayAndRefresh = () => {
  const performance = getPerf(`${addPositionAndDisplayAndRefresh.name}_id`)
  performance.mark(addPositionAndDisplayAndRefresh.name)
  const openAds = BootstrapPerformance.init({
    config: {
      Sources: {
        'AppNexus': appNexusConnectorMock
      }
    },
    performance
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
    .then(position => openAds.displayPosition({id: position.id}))
    .then(position => openAds.refreshPosition({id: position.id}))
    .catch(error => error)
    .then(x => performance.stop(addPositionAndDisplayAndRefresh.name))
    .then(x => performance.getEntries())
    .then(printTimelineChart())
}

export {
  addPosition,
  displayNonexistentPosition,
  refreshNonexistentPosition,
  addPositionAndDisplay,
  addPositionAndDisplayAndRefresh
}
