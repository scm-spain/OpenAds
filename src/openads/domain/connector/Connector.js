import AdDefinition from '../ad/AdDefinition'

/**
 * @abstract
 */
export default class Connector {
  constructor ({source, adapter, configuration}) {
    this._source = source
    this._adapter = adapter
    this._configuration = configuration
  }

  /**
   * @return {string} the attached source ID of the connector
   */
  get source () {
    return this._source
  }

  /**
   * @return {ConnectorAdapter} the connector adapter to transform requests and responses
   */
  get adapter () {
    return this._adapter
  }

  /**
   * @return {Object} the custom connector configuration, depending on source
   */
  get configuration () {
    return this._configuration
  }

  /**
   *
   * @param {string} targetId
   * @param {AdDefinition} adDefinition
   */
  findAd ({targetId, adDefinition}) {
    throw new Error('Connector#findAd must be implemented')
  }
}
