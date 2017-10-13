import Connector from '../../domain/connector/Connector'

export default class AppNexusConnector extends Connector {
  constructor ({source, connectorData, appNexusClient}) {
    super({
      source: source,
      adapter: connectorData.adapter,
      configuration: connectorData.configuration
    })
    this._member = this.configuration.member
    this._apnTag = appNexusClient
  }

  get member () {
    return this._member
  }

  findAd ({targetId, adDefinition}) {
    console.log('AppNexusConnector - findAd', targetId, adDefinition)

    this._apnTag.activateDebugMode()

    this._apnTag.setPageOpts({
      member: this._member,
      keywords: this.adapter.requestAdapter.keywords({adDefinition})
    })

    this._apnTag.onEvent({
      event: 'adAvailable',
      targetId: targetId,
      callback: (adRetrieved) => this.processAdRetrieved({
        target: targetId,
        adRetrieved: adRetrieved
      })
    })

    this._apnTag.defineTag({
      invCode: this.adapter.requestAdapter.invCode({adDefinition}),
      sizes: this.adapter.requestAdapter.sizes({adDefinition}),
      targetId: targetId
    })

    this._apnTag.loadTags()
  }

  // TODO this function out of the repository should be nice?
  processAdRetrieved ({target, adRetrieved}) {
    console.log('Ad Retrieved: ' + JSON.stringify(adRetrieved))
    this._apnTag.showTag({target})
  }
}
