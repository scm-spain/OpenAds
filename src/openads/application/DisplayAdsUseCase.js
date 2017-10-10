import ConnectorService from '../domain/service/ConnectorService'
import AdDefinitionService from '../domain/service/AdDefinitionService'

export default class DisplayAdsUseCase {
  /**
   *
   * @param {ConnectorService} connectorService
   * @param {AdDefinitionService} adDefinitionService
   */
  constructor ({connectorService, adDefinitionService}) {
    this._connectorService = connectorService
    this._adDefinitionService = adDefinitionService
  }

    /**
     *
     * @param {string} targetId
     * @param {string} position
     */
  display ({targetId, adKey}) {
    const adDefinition = this._adDefinitionService.adDefinition({key: adKey})
    const connector = this._connectorService.connector({source: adDefinition.source})

    connector.findAd({targetId, adDefinition})
  }
}
