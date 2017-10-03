import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/DisplayAdsUseCase'
import AdRepositoryResolverImpl from './AdRepositoryResolverImpl'

export default class Container {
  constructor ({config}) {
    this._config = config
    this._adRepositoryResolver = new AdRepositoryResolverImpl({connectors: config.connectors})
  }

  buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      adRepositoryResolver: this._adRepositoryResolver
    })
  }
}
