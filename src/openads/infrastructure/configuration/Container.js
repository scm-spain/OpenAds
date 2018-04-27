import HTMLDOMDriver from '../service/HTMLDOMDriver'
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
import RefreshPositionUseCase from '../../application/service/RefreshPositionUseCase'
import DisplayPositionUseCase from '../../application/service/DisplayPositionUseCase'
import DefaultPositionFactory from '../position/DefaultPositionFactory'
import RoutingAdConnectorManager from '../ad/RoutingAdConnectorManager'

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
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }

  _buildRefreshPositionUseCase () {
    return new RefreshPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }

  _buildAdConnectorManager () {
    return new RoutingAdConnectorManager({
      connectors: this._config.Sources
    })
  }

  _buildPositionRepository () {
    return new InMemoryPositionRepository()
  }

  _buildPositionFactory () {
    return new DefaultPositionFactory()
  }

  _buildErrorObserverFactory () {
    const logger = this.getInstance({key: 'Logger'})
    return errorObserverFactory(logger)
  }

  _buildDisplayPositionUseCase () {
    return new DisplayPositionUseCase({
      positionRepository: this.getInstance({key: 'PositionRepository'}),
      adConnectorManager: this.getInstance({key: 'AdConnectorManager'})
    })
  }
  _buildEagerSingletonInstances () {
    const errorObserver = this.getInstance({key: 'ErrorObserverFactory'})
    DomainEventBus.register({
      eventName: OBSERVER_ERROR_THROWN,
      observer: errorObserver})
  }
}
