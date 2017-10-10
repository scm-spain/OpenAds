import Connector from '../../domain/connector/Connector'

require('@schibstedspain/ast')

export default class AppNexusConnector extends Connector {
  constructor ({source, connectorData}) {
    super({
      source: source,
      adapter: connectorData.adapter,
      configuration: connectorData.configuration
    })
    this._member = this.configuration.member
    this._appNexusClient = apntag
  }

  get member () {
    return this._member
  }

  findAd ({targetId, adDefinition}) {
    console.log('AppNexusConnector - findAd', targetId, adDefinition)

    this._appNexusClient.debug = true
    this._appNexusClient.setPageOpts({
      member: this._member,
      keywords: this.adapter.requestAdapter.keywords({adDefinition})
    })

    this._appNexusClient.onEvent('adAvailable', targetId, (adRetrieved) => this.processAdRetrieved({
      target: targetId,
      adRetrieved: adRetrieved
    }))

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
    this._appNexusClient.showTag(target)
  }
}
