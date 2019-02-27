import HTMLDOMDriver from '../service/HTMLDOMDriver'
import DomainEventBus from '../../domain/service/DomainEventBus'
import LogLevel from 'loglevel'
import LogLevelLoggerInitializer from '../logger/LogLevelLoggerInitializer'
import AddPositionUseCase from '../../application/service/AddPositionUseCase'
import InMemoryPositionRepository from '../position/InMemoryPositionRepository'
import {errorObserverFactory} from './errorObserverFactory'
import {debugObserverFactory} from './debugObserverFactory'
import {OBSERVER_ERROR_THROWN} from '../../domain/service/observerErrorThrown'
import RefreshPositionUseCase from '../../application/service/RefreshPositionUseCase'
import DisplayPositionUseCase from '../../application/service/DisplayPositionUseCase'
import DefaultPositionFactory from '../position/DefaultPositionFactory'
import RoutingAdConnectorManager from '../ad/RoutingAdConnectorManager'
import {POSITION_CREATED} from '../../domain/position/positionCreated'
import {POSITION_DISPLAYED} from '../../domain/position/positionDisplayed'
import {POSITION_ALREADY_DISPLAYED} from '../../domain/position/positionAlreadyDisplayed'
import {POSITION_UPDATED} from '../../domain/position/positionUpdated'
import HasPositionUseCase from '../../application/service/HasPositionUseCase'

export default class Container {
  constructor({config, eager = true, currentWindow = window} = {}) {
    this._config = config
    this._currentWindow = currentWindow
    this._instances = new Map()
    if (eager) this._buildEagerSingletonInstances()
  }

  getInstance({key}) {
    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]())
      } catch (e) {
        throw new Error(`Error creating instance: ${key}`, e)
      }
    }
    return this._instances.get(key)
  }

  _buildLogger() {
    return this.getInstance({key: 'LoggerInitializer'}).logger()
  }

  _buildLoggerInitializer() {
    return new LogLevelLoggerInitializer({
      loggerName: 'OpenAds',
      domDriver: this.getInstance({key: 'DOMDriver'}),
      logLevel: LogLevel,
      connectors: this._config.Sources
    })
  }

  _buildDOMDriver() {
    return new HTMLDOMDriver({dom: this._currentWindow.document})
  }

  _buildAddPositionUseCase() {
    return new AddPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      positionFactory: this.getInstance({key: 'PositionFactory'}),
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }

  _buildHasPositionUseCase() {
    return new HasPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'})
    })
  }

  _buildRefreshPositionUseCase() {
    return new RefreshPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }

  _buildAdConnectorManager() {
    return new RoutingAdConnectorManager({
      connectors: this._config.Sources
    })
  }

  _buildPositionRepository() {
    return new InMemoryPositionRepository()
  }

  _buildPositionFactory() {
    return new DefaultPositionFactory()
  }

  _buildErrorObserverFactory() {
    const logger = this.getInstance({key: 'Logger'})
    return errorObserverFactory(logger)
  }

  _buildDebugObserverFactory() {
    const logger = this.getInstance({key: 'Logger'})
    return debugObserverFactory(logger)
  }

  _buildDisplayPositionUseCase() {
    return new DisplayPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }
  _buildEagerSingletonInstances() {
    const errorObserver = this.getInstance({key: 'ErrorObserverFactory'})
    const debugObserver = this.getInstance({key: 'DebugObserverFactory'})
    DomainEventBus.register({
      eventName: OBSERVER_ERROR_THROWN,
      observer: errorObserver
    })
    DomainEventBus.register({
      eventName: POSITION_CREATED,
      observer: debugObserver
    })
    DomainEventBus.register({
      eventName: POSITION_DISPLAYED,
      observer: debugObserver
    })
    DomainEventBus.register({
      eventName: POSITION_UPDATED,
      observer: debugObserver
    })
    DomainEventBus.register({
      eventName: POSITION_ALREADY_DISPLAYED,
      observer: debugObserver
    })
  }
}
