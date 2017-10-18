import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/DisplayAdsUseCase'
import ConnectorServiceImpl from '../service/ConnectorServiceImpl'
import AdDefinitionServiceImpl from '../service/AdDefinitionServiceImpl'
import AppNexusConnectorImpl from '../appnexus/AppNexusConnectorImpl'
import AdChainedRepository from '../repository/AdChainedRepository'
import AppNexusAdRepository from '../appnexus/AppNexusAdRepository'

export default class Container {
  constructor ({config}) {
    this._config = config
    this._instances = new Map()
  }

  getInstance ({key}) {
    if (undefined === this._instances.get(key)) {
      this._instances.set(key, this['_build' + key]())
    }
    return this._instances.get(key)
  }

  _buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  _buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      adChainedRepository: this.getInstance({key: 'AdChainedRepository'})
    })
  }

  _buildConnectorService () {
    return new ConnectorServiceImpl({
      connectors: this._config.connectors,
      appNexusClient: this.getInstance({key: 'AppNexusConnector'})
    })
  }

  _buildAdDefinitionService () {
    return new AdDefinitionServiceImpl({
      adDefinitions: this._config.adDefinitions
    })
  }

  _buildAppNexusConnector () {
    return new AppNexusConnectorImpl({
      source: 'AppNexus',
      connectorData: this._config.connectors.AppNexus
    })
  }

  _buildAppNexusRepository () {
    return new AppNexusAdRepository({
      appNexusConnector: this.getInstance({key: 'AppNexusConnector'})
    })
  }
  _buildAdChainedRepository () {
    return new AdChainedRepository({
      googleRepository: null,
      appnexusRepository: this.getInstance({key: 'AppNexusRepository'}),
      configuration: this._config
    })
  }
}
