import AdDefinitionService from '../../domain/service/AdDefinitionService'
import AdDefinition from '../../domain/ad/AdDefinition'

export default class AdDefinitionServiceImpl extends AdDefinitionService {
  constructor ({adDefinitions}) {
    super()
    this._adDefinitionsCatalog = {}
    if (adDefinitions !== null) {
      Object.keys(adDefinitions).map((key) => {
        this._adDefinitionsCatalog[key] = new AdDefinition({
          key: key,
          source: adDefinitions[key].source,
          configuration: adDefinitions[key].configuration
        })
      })
    }
  }

    /**
     *
     * @param {string} key
     * @return {AdDefinition}
     */
  adDefinition ({key}) {
    let adDefinition = this._adDefinitionsCatalog[key]
    if (adDefinition === null) {
      throw new Error('Ad Definition Not Found for key: ' + key)
    }
    return adDefinition
  }
}
