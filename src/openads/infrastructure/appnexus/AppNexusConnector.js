import Connector from '../../domain/connector/Connector'
import NativeAdResponse from '../../domain/ad/NativeAdResponse'
import HtmlAdResponse from '../../domain/ad/HtmlAdResponse'

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
      callback: (adRetrieved) => this.adapter.responseAdapter.onAdRetrieved({
        adResponse: this._createAdResponse({
          targetId: targetId,
          adDefinition: adDefinition,
          adRetrieved: adRetrieved
        })
      })
    })

    this._appNexusClient.defineTag({
      invCode: this.adapter.requestAdapter.invCode({adDefinition}),
      sizes: this.adapter.requestAdapter.sizes({adDefinition}),
      targetId: targetId
    })

    this._appNexusClient.loadTags()
  }

  /**
   *
   * @private
   */
  _createAdResponse ({targetId, adDefinition, adRetrieved}) {
    return adRetrieved.adType === 'native'
        ? new NativeAdResponse({
          targetId,
          adDefinition,
          adRetrieved})
        : new HtmlAdResponse({
          targetId,
          adDefinition,
          adRetrieved,
          showAdCallback: () => this._appNexusClient.showTag({target: targetId})
        })
  }
}
