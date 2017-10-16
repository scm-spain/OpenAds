import Connector from '../../domain/connector/Connector'

export default class AppNexusConnector extends Connector {
  constructor ({source, connectorData, appNexusClient}) {
    super({
      source: source,
      adapter: connectorData.adapter,
      configuration: connectorData.configuration
    })
    this._member = this.configuration.member
    this._appNexusClient = appNexusClient
  }

  get member () {
    return this._member
  }

  findAd ({targetId, adDefinition}) {
    console.log('AppNexusConnector - findAd', targetId, adDefinition)

    this._appNexusClient.activateDebugMode()

    this._appNexusClient.setPageOpts({
      member: this._member,
      keywords: this.adapter.requestAdapter.keywords({adDefinition})
    })

    this._appNexusClient.onEvent({
      event: 'adAvailable',
      targetId: targetId,
      callback: (adRetrieved) => this.processAdRetrieved({
        target: targetId,
        adRetrieved: adRetrieved
      })
    })

    this._appNexusClient.defineTag({
      invCode: this.adapter.requestAdapter.invCode({adDefinition}),
      sizes: this.adapter.requestAdapter.sizes({adDefinition}),
      targetId: targetId
    })

    this._appNexusClient.loadTags()
  }

  // TODO this function out of the repository should be nice?
  processAdRetrieved ({target, adRetrieved}) {
    console.log('Ad Retrieved: ' + JSON.stringify(adRetrieved))
    this._appNexusClient.showTag({target})
  }
}
