import HTMLDOMDriver from '../service/HTMLDOMDriver'
import AppNexusConnectorImpl from '../connector/appnexus/AppNexusConnectorImpl'

import AppNexusResultMapper from '../service/appnexus/AppNexusResultMapper'
import BannerFactory from '../../domain/ad/banner/BannerFactory'
import AppNexusBannerRenderer from '../service/appnexus/AppNexusBannerRenderer'

import AppNexusClient from '../connector/appnexus/AppNexusClient'
import NativeRendererFactory from '../../domain/ad/native/NativeRendererFactory'
import NativeRendererProcessor from '../../domain/service/NativeRendererProcessor'
import NativeFactory from '../../domain/ad/native/NativeFactory'
import AppNexusRequestMapper from '../service/appnexus/AppNexusRequestMapper'
import LogLevel from 'loglevel'
import LogLevelPrefix from 'loglevel-plugin-prefix'
import LogLevelLoggerInitializer from '../logger/LogLevelLoggerInitializer'
import LogLevelPrefixConfigurator from '../logger/LogLevelPrefixConfigurator'
import LogLevelConfigurator from '../logger/LogLevelConfigurator'
import pageCreatedSubscriberFactory from '../appnexus/pageCreatedSubscriberFactory'
import DomainEventBus from '../../domain/service/DomainEventBus'
import {PAGE_CREATED} from '../../domain/page/pageCreated'
import CreatePageUseCase from '../../application/service/CreatePageUseCase'
import InMemoryPageRepository from '../page/InMemoryPageRepository'
import PageFactory from '../../domain/page/PageFactory'

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
  _buildCreatePageUseCase () {
    return new CreatePageUseCase({
      pageRepository: this.getInstance({key: 'PageRepository'}),
      pageFactory: this.getInstance({key: 'PageFactory'})
    })
  }

  _buildPageRepository () {
    return new InMemoryPageRepository()
  }

  _buildPageFactory () {
    return new PageFactory()
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

  _buildpageCreatedSubscriber () {
    return pageCreatedSubscriberFactory(this.getInstance({key: 'AppNexusConnector'}))
  }

  _buildEagerSingletonInstances () {
    DomainEventBus.register({
      eventName: PAGE_CREATED,
      observer: this.getInstance({key: 'pageCreatedSubscriber'})
    })
  }
}
