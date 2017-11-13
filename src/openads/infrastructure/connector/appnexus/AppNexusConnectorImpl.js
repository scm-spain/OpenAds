import AppNexusConnector from './AppNexusConnector'

export default class AppNexusConnectorImpl extends AppNexusConnector {
  constructor ({source, connectorData, appNexusClient}) {
    super({
      source: source,
      configuration: connectorData
    })
    this._member = this.configuration.Member
    this._appNexusClient = appNexusClient
    this._registeredEvents = new Map()
  }

  get member () {
    return this._member
  }
  activateDebugMode () {
    this._appNexusClient.debug = true
    return this
  }

  setPageOpts ({member, keywords}) {
    this._appNexusClient.anq.push(() => this._appNexusClient.setPageOpts({member, keywords}))
    return this
  }

  onEvent ({event, targetId, callback}) {
    this._appNexusClient.anq.push(() => {
      this._appNexusClient.onEvent(event, targetId, callback)
      if (!this._registeredEvents.has(targetId)) {
        this._registeredEvents.set(targetId, [])
      }
      this._registeredEvents.get(targetId).push(event)
    })
    return this
  }

  defineTag ({member, targetId, invCode, sizes, keywords}) {
    this._appNexusClient.anq.push(() => this._appNexusClient.defineTag({member, targetId, invCode, sizes, keywords}))
    return this
  }

  loadTags () {
    this._appNexusClient.anq.push(() => this._appNexusClient.loadTags())
    return this
  }

  showTag ({target}) {
    this._appNexusClient.anq.push(() => this._appNexusClient.showTag(target))
    return this
  }

  reset () {
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
