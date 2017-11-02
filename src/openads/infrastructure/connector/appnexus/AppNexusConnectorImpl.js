import AppNexusConnector from './AppNexusConnector'

export default class AppNexusConnectorImpl extends AppNexusConnector {
  constructor ({source, connectorData, appNexusClient}) {
    super({
      source: source,
      configuration: connectorData.configuration
    })
    this._member = this.configuration.member
    this._appNexusClient = appNexusClient
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
    this._appNexusClient.anq.push(() => this._appNexusClient.onEvent(event, targetId, callback))
    return this
  }

  defineTag ({invCode, sizes, targetId}) {
    this._appNexusClient.anq.push(() => this._appNexusClient.defineTag({invCode, sizes, targetId}))
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
}
