/**
 * @abstract
 */
export default class Connector {
  constructor ({source, configuration}) {
    this._source = source
    this._configuration = configuration
  }

  /**
   * @return {string} the attached source ID of the connector
   */
  get source () {
    return this._source
  }

  /**
   * @return {Object} the custom connector configuration, depending on source
   */
  get configuration () {
    return this._configuration
  }
}
