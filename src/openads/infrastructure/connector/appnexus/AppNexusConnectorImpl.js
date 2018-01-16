import AppNexusConnector from './AppNexusConnector'

export default class AppNexusConnectorImpl extends AppNexusConnector {
  constructor ({source, connectorData, appNexusClient, logger}) {
    super({
      source: source,
      configuration: connectorData
    })
    this._member = this.configuration.Member
    this._appNexusClient = appNexusClient
    this._registeredEvents = new Map()
    this._logger = logger
  }

  get member () {
    return this._member
  }
  activateDebugMode () {
    this._logger.debug('Activating AppNexus Debug Mode')
    this._appNexusClient.debug = true
    return this
  }

  setPageOpts ({member, keywords}) {
    this._logger.debug('Setting AppNexus Page Opts', '| member:', member, '| keywords:', keywords)
    this._appNexusClient.anq.push(() => this._appNexusClient.setPageOpts({member, keywords}))
    return this
  }

  onEvent ({event, targetId, callback}) {
    this._logger.debug('Activating AppNexus Listener', '| event:', event, '|targetId:', targetId)
    this._appNexusClient.anq.push(() => {
      this._appNexusClient.onEvent(event, targetId, callback)
      if (!this._registeredEvents.has(targetId)) {
        this._registeredEvents.set(targetId, [])
      }
      this._registeredEvents.get(targetId).push(event)
    })
    return this
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    this._logger.debug('Defining AppNexus Tag', '| member:', member, '| targetId:', targetId, '| invCode:', invCode, '| sizes:', sizes, '| keywords:', keywords, '| native:', native)
    this._appNexusClient.anq.push(() => this._appNexusClient.defineTag({member, targetId, invCode, sizes, keywords, native}))
    return this
  }

  loadTags () {
    this._logger.debug('Loading AppNexus Tags')
    this._appNexusClient.anq.push(() => this._appNexusClient.loadTags())
    return this
  }

  showTag ({target}) {
    this._logger.debug('Showing AppNexus Tag', '| target:', target)
    this._appNexusClient.anq.push(() => this._appNexusClient.showTag(target))
    return this
  }

  reset () {
    this._logger.debug('Reset AppNexus connector')
    this._appNexusClient.anq.push(() => {
      this._appNexusClient.clearRequest()
      this._registeredEvents.forEach((eventArray, targetId) => {
        eventArray.forEach(event => this._appNexusClient.offEvent(event, targetId))
      })
      this._registeredEvents = new Map()
    })
    return this
  }
}
