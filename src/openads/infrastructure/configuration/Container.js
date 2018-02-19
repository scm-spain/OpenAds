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
import DomainEventBus from '../../domain/service/DomainEventBus'
import ResetConnectorsUseCase from '../../application/service/ResetConnectorsUseCase'
import NativeRendererFactory from '../../domain/ad/native/NativeRendererFactory'
import NativeRendererProcessor from '../../domain/service/NativeRendererProcessor'
import NativeFactory from '../../domain/ad/native/NativeFactory'
import AppNexusRequestMapper from '../service/appnexus/AppNexusRequestMapper'
import LogLevel from 'loglevel'
import LogLevelPrefix from 'loglevel-plugin-prefix'
import LogLevelLoggerInitializer from '../logger/LogLevelLoggerInitializer'
import LogLevelPrefixConfigurator from '../logger/LogLevelPrefixConfigurator'
import LogLevelConfigurator from '../logger/LogLevelConfigurator'
import AddPositionUseCase from '../../application/service/AddPositionUseCase'
import InMemoryPositionRepository from '../position/InMemoryPositionRepository'
import ProxyPositionFactory from '../position/ProxyPositionFactory'
import {errorObserverFactory} from './errorObserverFactory'
import {OBSERVER_ERROR_THROWN} from '../../domain/service/observerErrorThrown'
import proxyHandlerFactory from '../position/proxyHandlerFactory'
import AppNexusConsumersRepository from '../repository/appnexus/AppNexusConsumersRepository'
import positionCreatedObserverFactory from '../position/positionCreatedObserver'
import {POSITION_CREATED} from '../../domain/position/positionCreated'
import UpdatePositionUseCase from '../../application/service/UpdatePositionUseCase'
import DisplayPositionUseCase from '../../application/service/DisplayPositionUseCase'
import positionDisplayedObserver from '../position/positionDisplayedObserver'
import {POSITION_DISPLAYED} from '../../domain/position/positionDisplayed'
import positionAlreadyDisplayedObserver from '../position/positionAlreadyDisplayedObserver'
import {POSITION_ALREADY_DISPLAYED} from '../../domain/position/positionAlreadyDisplayed'

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
    return this.getInstance({key: 'LoggerInitializer'}).logger({
      loggerName: 'OpenAds'
    })
  }

  _buildLoggerInitializer () {
    return new LogLevelLoggerInitializer({
      loggerPrefixConfigurator: this.getInstance({key: 'LoggerPrefixConfigurator'}),
      loggerLevelConfigurator: this.getInstance({key: 'LoggerLevelConfigurator'})
    })
  }

  _buildLoggerPrefixConfigurator () {
    return new LogLevelPrefixConfigurator({
      logLevelPrefix: LogLevelPrefix,
      options: this._config.LogLevelPrefix
    })
  }

  _buildLoggerLevelConfigurator () {
    return new LogLevelConfigurator({
      domDriver: this.getInstance({key: 'DOMDriver'}),
      logLevel: LogLevel,
      options: this._config.LogLevel
    })
  }

  _buildDOMDriver () {
    return new HTMLDOMDriver({dom: window.document})
  }

  _buildAddPositionUseCase () {
    return new AddPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      positionFactory: this.getInstance({key: 'PositionFactory'})
    })
  }
  _buildUpdatePositionUseCase () {
    return new UpdatePositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'})
    })
  }

  _buildPositionRepository () {
    return new InMemoryPositionRepository()
  }

  _buildPositionFactory () {
    return new ProxyPositionFactory({
      proxyHandler: this.getInstance({key: 'ProxyHandler'})
    })
  }
  _buildProxyHandler () {
    return proxyHandlerFactory(this.getInstance({key: 'AppNexusConsumersRepository'}))({
      wait: this._config.Sources.Pulling,
      timeout: this._config.Sources.Timeout
    })
  }
  _buildAppNexusConsumersRepository () {
    return new AppNexusConsumersRepository()
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

  _buildErrorObserverFactory () {
    const logger = this.getInstance({key: 'Logger'})
    return errorObserverFactory(logger)
  }

  _buildDisplayPositionUseCase () {
    return new DisplayPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'})
    })
  }

  _buildPositionDisplayedObserver () {
    const appNexusConnector = this.getInstance({key: 'AppNexusConnector'})
    return positionDisplayedObserver(appNexusConnector)
  }

  _buildPositionAlreadyDisplayedObserver () {
    const appNexusConnector = this.getInstance({key: 'AppNexusConnector'})
    return positionAlreadyDisplayedObserver(appNexusConnector)
  }

  _buildPositionCreatedObserverFactory () {
    const connector = this.getInstance({key: 'AppNexusConnector'})
    const appnexusConsumerRepository = this.getInstance({key: 'AppNexusConsumersRepository'})
    return positionCreatedObserverFactory(connector)(appnexusConsumerRepository)
  }

  _buildEagerSingletonInstances () {
    this.getInstance({key: 'EventDispatcher'})
    const errorObserver = this.getInstance({key: 'ErrorObserverFactory'})
    const positionCreatedObserver = this.getInstance({key: 'PositionCreatedObserverFactory'})
    const positionDisplayedObserver = this.getInstance({key: 'PositionDisplayedObserver'})
    const positionAlreadyDisplayedObserver = this.getInstance({key: 'PositionAlreadyDisplayedObserver'})

    DomainEventBus.register({
      eventName: OBSERVER_ERROR_THROWN,
      observer: errorObserver})
    DomainEventBus.register({
      eventName: POSITION_DISPLAYED,
      observer: positionDisplayedObserver})
    DomainEventBus.register({
      eventName: POSITION_ALREADY_DISPLAYED,
      observer: positionAlreadyDisplayedObserver})
    DomainEventBus.register({
      eventName: POSITION_CREATED,
      observer: positionCreatedObserver
    })
  }
}
