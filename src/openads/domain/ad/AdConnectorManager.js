/**
 * @interface
 */
export default class AdConnectorManager {
  /**
   * Returns the connector associated to given source id
   * @param {string} source
   * @returns {AdLoadable|AdViewable}
   */
  getConnector ({source}) {
    throw new Error('AdConnectorManager#getConnector must be implemented')
  }
}