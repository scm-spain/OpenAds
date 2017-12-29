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
import EventDispatcher from '../../domain/service/EventDispatcher'
import ResetConnectorsUseCase from '../../application/service/ResetConnectorsUseCase'
import NativeRendererFactory from '../../domain/ad/native/NativeRendererFactory'
import NativeRendererProcessor from '../../domain/service/NativeRendererProcessor'
import NativeFactory from '../../domain/ad/native/NativeFactory'
import AppNexusRequestMapper from '../service/appnexus/AppNexusRequestMapper'
import LogLevelLoggerInitializer from '../logging/LogLevelLoggerInitializer'

export default class Container {
  constructor ({config}) {
    this._config = config
    this._instances = new Map()
    this._buildEagerSingletonInstances()
  }

  getInstance ({key}) {
    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]())
      } catch (e) {
        throw new Error(`Error creating instance: ${key}`, e)
      }
    }
    return this._instances.get(key)
  }

  _buildLogger () {
    return LogLevelLoggerInitializer.createLogger({config: this._config.LogLevel})
  }

  _buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  _buildDisplayAdsUseCase () {
    return new DisplayAdsUseCase({
      adChainedRepository: this.getInstance({key: 'AdChainedRepository'}),
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildFindAdsUseCase () {
    return new FindAdUseCase({
      adChainedRepository: this.getInstance({key: 'AdChainedRepository'}),
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildResetConnectorsUseCase () {
    return new ResetConnectorsUseCase({
      adChainedRepository: this.getInstance({key: 'AdChainedRepository'}),
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildEventDispatcher () {
    return new EventDispatcher({
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildNativeRendererProcessor () {
    return new NativeRendererProcessor({
      nativeRendererFactory: this.getInstance({key: 'NativeRendererFactory'}),
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildNativeRendererFactory () {
    return new NativeRendererFactory({
      domDriver: this.getInstance({key: 'DOMDriver'})
    })
  }

  _buildAppNexusConnector () {
    return new AppNexusConnectorImpl({
      source: 'AppNexus',
      connectorData: this._config.Sources.AppNexus,
      appNexusClient: this.getInstance({key: 'AppNexusClient'}),
      logger: this.getInstance({key: 'Logger'})
    })
  }

  _buildAppNexusClient () {
    return AppNexusClient.build()
  }

  _buildAppNexusRepository () {
    return new AppNexusAdRepository({
      appNexusConnector: this.getInstance({key: 'AppNexusConnector'}),
      appNexusResultMapper: this.getInstance({key: 'AppNexusResultMapper'}),
      appNexusRequestMapper: this.getInstance({key: 'AppNexusRequestMapper'})
    })
  }

  _buildAdChainedRepository () {
    return new AdChainedRepository({
      appnexusRepository: this.getInstance({key: 'AppNexusRepository'}),
      configuration: this._config
    })
  }

  _buildAppNexusResultMapper () {
    return new AppNexusResultMapper({
      bannerFactory: this.getInstance({key: 'BannerFactory'}),
      nativeFactory: this.getInstance({key: 'NativeFactory'})
    })
  }

  _buildAppNexusRequestMapper () {
    return new AppNexusRequestMapper()
  }

  _buildBannerFactory () {
    return new BannerFactory({
      appNexusBannerRenderer: this.getInstance({key: 'AppNexusBannerRenderer'}),
      eventDispatcher: this.getInstance({key: 'EventDispatcher'})
    })
  }

  _buildAppNexusBannerRenderer () {
    return new AppNexusBannerRenderer({
      appNexusConnector: this.getInstance({key: 'AppNexusConnector'}),
      domDriver: this.getInstance({key: 'DOMDriver'})
    })
  }

  _buildNativeFactory () {
    return new NativeFactory({
      nativeRendererProcessor: this.getInstance({key: 'NativeRendererProcessor'}),
      eventDispatcher: this.getInstance({key: 'EventDispatcher'})
    })
  }

  _buildEagerSingletonInstances () {
    this.getInstance({key: 'EventDispatcher'})
  }
}
