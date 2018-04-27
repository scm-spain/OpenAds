/**
 * @class
 * @implements {AdConnectorManager}
 */
export default class RoutingAdConnectorManager {
  constructor ({connectors}) {
    this._connectors = new Map()
    connectors.forEach(connector => this._connectors.set(connector.id(), connector))
  }
  getConnector ({source}) {
    return Promise.resolve(source)
      .then(source => this._connectors.get(source))
  }
}
