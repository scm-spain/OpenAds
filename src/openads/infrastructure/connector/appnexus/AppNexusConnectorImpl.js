import AppNexusConnector from './AppNexusConnector'

require('@schibstedspain/ast')

export default class AppNexusConnectorImpl extends AppNexusConnector {
  constructor ({source, connectorData}) {
    super({
      source: source,
      configuration: connectorData.configuration
    })
    this._member = this.configuration.member
    this._appNexusClient = apntag
  }

  get member () {
    return this._member
  }
  activateDebugMode () {
    this._appNexusClient.debug = true
    return this
  }

  setPageOpts ({member, keywords}) {
    this._appNexusClient.setPageOpts({member, keywords})
    return this
  }

  onEvent ({event, targetId, callback}) {
    this._appNexusClient.onEvent(event, targetId, callback)
    return this
  }

  defineTag ({invCode, sizes, targetId}) {
    this._appNexusClient.defineTag({invCode, sizes, targetId})
    return this
  }

  loadTags () {
    this._appNexusClient.loadTags()
    return this
  }

  showTag ({target}) {
    this._appNexusClient.showTag({target})
    return this
  }
}
