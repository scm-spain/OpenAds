import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DisplayAdsUseCase from '../../application/service/DisplayAdsUseCase'
import AppNexusConnectorImpl from '../connector/appnexus/AppNexusConnectorImpl'
import AdChainedRepository from '../repository/AdChainedRepository'
import AppNexusAdRepository from '../repository/appnexus/AppNexusAdRepository'
import AppNexusResultMapper from '../service/appnexus/AppNexusResultMapper'
import BannerFactory from '../../domain/ad/banner/BannerFactory'
import AppNexusBannerRenderer from '../service/appnexus/AppNexusBannerRenderer'
import FindAdUseCase from '../../application/service/FindAdUseCase'
import AppNexusClient from '../connector/appnexus/AppNexusClient'

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

  _buildFindAdsUseCase () {
    return new FindAdUseCase({
      adChainedRepository: this.getInstance({key: 'AdChainedRepository'})
    })
  }

  _buildAppNexusConnector () {
    return new AppNexusConnectorImpl({
      source: 'AppNexus',
      connectorData: this._config.Sources.AppNexus,
      appNexusClient: this.getInstance({key: 'AppNexusClient'})
    })
  }

  _buildAppNexusClient () {
    return AppNexusClient.build()
  }

  _buildAppNexusRepository () {
    return new AppNexusAdRepository({
      appNexusConnector: this.getInstance({key: 'AppNexusConnector'}),
      appNexusResultMapper: this.getInstance({key: 'AppNexusResultMapper'})
    })
  }
  _buildAdChainedRepository () {
    return new AdChainedRepository({
      googleRepository: null,
      appnexusRepository: this.getInstance({key: 'AppNexusRepository'}),
      configuration: this._config
    })
  }
  _buildAppNexusResultMapper () {
    return new AppNexusResultMapper({
      bannerFactory: this.getInstance({key: 'BannerFactory'})
    })
  }
  _buildBannerFactory () {
    return new BannerFactory({
      appNexusBannerRenderer: this.getInstance({key: 'AppNexusBannerRenderer'})
    })
  }
  _buildAppNexusBannerRenderer () {
    return new AppNexusBannerRenderer({
      appNexusConnector: this.getInstance({key: 'AppNexusConnector'})
    })
  }
}
