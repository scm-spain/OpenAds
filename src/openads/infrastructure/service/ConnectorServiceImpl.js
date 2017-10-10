import AppNexusConnector from '../appnexus/AppNexusConnector'
import ConnectorService from '../../domain/service/ConnectorService'

export default class ConnectorServiceImpl extends ConnectorService {
  constructor ({connectors}) {
    super()
    this._connectorsCatalog = {}
    if (connectors !== null) {
      Object.keys(connectors).map((key) => {
        this._connectorsCatalog[key] = this._createConnectorImpl({
          source: key,
          connectorData: connectors[key]
        })
      })
    }
  }
  connector ({source}) {
    let connector = this._connectorsCatalog[source]
    if (connector === null) {
      throw new Error('Connector Not Found for: ' + source)
    }
    return connector
  }
  _createConnectorImpl ({source, connectorData}) {
    switch (source) {
      case 'AppNexus': {
        return new AppNexusConnector({source, connectorData})
      }
      default: {
        throw new Error('No Connector found for source: ' + source)
      }
    }
  }
}
