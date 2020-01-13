/**
 * @class
 * @implements {AdConnectorManager}
 */
export default class RoutingAdConnectorManager {
  constructor({connectors = {}} = {}) {
    this._connectors = connectors
  }

  getConnector({source}) {
    return Promise.resolve(source).then(source => this._connectors[source])
  }
}
