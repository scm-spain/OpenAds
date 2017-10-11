import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/DisplayAdsUseCase'
import ConnectorServiceImpl from '../service/ConnectorServiceImpl'
import AdDefinitionServiceImpl from '../service/AdDefinitionServiceImpl'
import AppNexusClient from "../appnexus/AppNexusClient";

export default class Container {
  constructor ({config}) {
    this._config = config
  }

  buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      connectorService: this.buildConnectorService(),
      adDefinitionService: this.buildAdDefinitionService()
    })
  }

  buildConnectorService () {
    return new ConnectorServiceImpl({
      connectors: this._config.connectors, appNexusClient : this.buildAppNexusClient()
    })
  }

  buildAdDefinitionService () {
    return new AdDefinitionServiceImpl({
      adDefinitions: this._config.adDefinitions
    })
  }

    buildAppNexusClient ()
    {
      return new AppNexusClient();
    }
}
