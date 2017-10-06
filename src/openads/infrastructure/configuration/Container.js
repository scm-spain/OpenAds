import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/DisplayAdsUseCase'
import AdRepositoryResolverImpl from '../repository/AdRepositoryResolverImpl'
import AdCatalogRepositoryImpl from '../repository/AdCatalogRepositoryImpl'

export default class Container {
  constructor ({config}) {
    this._config = config
  }

  buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      adRepositoryResolver: this.buildAdRepositoryResolver(),
      adDefinitionsCatalog: this.buildAdCatalog()
    })
  }

  buildAdRepositoryResolver () {
    return new AdRepositoryResolverImpl({
      connectors: this._config.connectors
    })
  }

  buildAdCatalog () {
    return new AdCatalogRepositoryImpl({
      ads: this._config.ads
    })
  }
}
