import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/DisplayAdsUseCase'
import AppNexusAdRepository from '../repository/AppNexusAdRepository'
import AppNexusAdRenderer from '../service/AppNexusAdRenderer'
require('@schibstedspain/ast')

export default class Container {
  constructor ({config}) {
    this._config = config
  }

  buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      repository: this.buildAdRepository(),
      adRenderer: this.buildAdRenderer()
    })
  }

  buildAdRepository () {
    return new AppNexusAdRepository({appNexusClient: this.buildAppNexusClient()})
  }

  buildAdRenderer () {
    return new AppNexusAdRenderer({appNexusClient: this.buildAppNexusClient()})
  }

  buildAppNexusClient () {
    return apntag
  }
}
