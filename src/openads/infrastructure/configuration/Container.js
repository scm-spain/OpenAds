import HTMLDOMDriver from '../service/HTMLDOMDriver'
import AppNexusConnectorImpl from '../connector/appnexus/AppNexusConnectorImpl'
import AppNexusClient from '../connector/appnexus/AppNexusClient'
import DomainEventBus from '../../domain/service/DomainEventBus'
import LogLevel from 'loglevel'
import LogLevelPrefix from 'loglevel-plugin-prefix'
import LogLevelLoggerInitializer from '../logger/LogLevelLoggerInitializer'
import LogLevelPrefixConfigurator from '../logger/LogLevelPrefixConfigurator'
import LogLevelConfigurator from '../logger/LogLevelConfigurator'
import AddPositionUseCase from '../../application/service/AddPositionUseCase'
import InMemoryPositionRepository from '../position/InMemoryPositionRepository'
import {errorObserverFactory} from './errorObserverFactory'
import {OBSERVER_ERROR_THROWN} from '../../domain/service/observerErrorThrown'
import positionCreatedObserverFactory from '../position/positionCreatedObserver'
import {POSITION_CREATED} from '../../domain/position/positionCreated'
import RefreshPositionUseCase from '../../application/service/RefreshPositionUseCase'
import DisplayPositionUseCase from '../../application/service/DisplayPositionUseCase'
import positionDisplayedObserver from '../position/positionDisplayedObserver'
import {POSITION_DISPLAYED} from '../../domain/position/positionDisplayed'
import positionAlreadyDisplayedObserver from '../position/positionAlreadyDisplayedObserver'
import {POSITION_ALREADY_DISPLAYED} from '../../domain/position/positionAlreadyDisplayed'
import {POSITION_SEGMENTATION_CHANGED} from '../../domain/position/positionSegmentationChanged'
import positionSegmentationChangedObserverFactory from '../position/positionSegmentationChangedObserver'
import DefaultPositionFactory from '../position/DefaultPositionFactory'
import PullingAdRepository from '../repository/PullingAdRepository'
import {TIMEOUT_DEBOUNCE, TIMEOUT_BUFFER} from '../connector/appnexus/timeout/timeouts'

export default class Container {
  constructor ({config, eager = true} = {}) {
    this._config = config
    this._instances = new Map()
    if (eager) this._buildEagerSingletonInstances()
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
      positionFactory: this.getInstance({key: 'PositionFactory'}),
      adRepository: this.getInstance({key: 'AdRepository'})
    })
  }

  _buildRefreshPositionUseCase () {
    return new RefreshPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      adRepository: this.getInstance({key: 'AdRepository'})
    })
  }

  _buildAdRepository () {
    return new PullingAdRepository({
      wait: this._config.Sources.Pulling,
      timeout: this._config.Sources.Timeout
    })
  }

  _buildPositionRepository () {
    return new InMemoryPositionRepository()
  }

  _buildPositionFactory () {
    return new DefaultPositionFactory()
  }

  _buildAppNexusConnector () {
    return new AppNexusConnectorImpl({
      source: 'AppNexus',
      connectorData: this._config.Sources.AppNexus,
      appNexusClient: this.getInstance({key: 'AppNexusClient'}),
      logger: this.getInstance({key: 'Logger'}),
      debounceTimeOut: TIMEOUT_DEBOUNCE,
      bufferTimeOut: TIMEOUT_BUFFER
    })
  }

  _buildAppNexusClient () {
    return AppNexusClient.build()
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

  _buildPositionCreatedObserver () {
    const connector = this.getInstance({key: 'AppNexusConnector'})
    const appnexusConsumerRepository = this.getInstance({key: 'AdRepository'})
    return positionCreatedObserverFactory(connector)(appnexusConsumerRepository)
  }

  _buildPositionSegmentationChangedObserver () {
    const connector = this.getInstance({key: 'AppNexusConnector'})
    return positionSegmentationChangedObserverFactory(connector)
  }

  _buildEagerSingletonInstances () {
    const errorObserver = this.getInstance({key: 'ErrorObserverFactory'})
    const positionCreatedObserver = this.getInstance({key: 'PositionCreatedObserver'})
    const positionDisplayedObserver = this.getInstance({key: 'PositionDisplayedObserver'})
    const positionAlreadyDisplayedObserver = this.getInstance({key: 'PositionAlreadyDisplayedObserver'})
    const positionSegmentationChangedObserver = this.getInstance({key: 'PositionSegmentationChangedObserver'})

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
    DomainEventBus.register({
      eventName: POSITION_SEGMENTATION_CHANGED,
      observer: positionSegmentationChangedObserver
    })
  }
}
