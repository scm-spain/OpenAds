import AppNexusAdRepository from './AppNexusAdRepository'
import MissingImplementationAdRepository from './MissingImplementationAdRepository'
import AdRepositoryResolver from '../../domain/service/AdRepositoryResolver'

const APP_NEXUS = 'AppNexus'

export default class AdRepositoryResolverImpl extends AdRepositoryResolver {
  constructor ({connectors}) {
    super()
    this._connectors = {}
    if (connectors !== null) {
      for (let connector of connectors) {
        this._connectors[connector.driver] = this.resolve({connector})
      }
    }
  }
  adRepository ({source}) {
    let connector = this._connectors[source]
    if (connector === null) {
      throw new Error('Connector Not Found for: ' + source)
    }
    return connector
  }
  resolve ({connector}) {
    switch (connector.driver) {
      case APP_NEXUS: {
        return new AppNexusAdRepository({member: connector.member})
      }
      default: {
        return new MissingImplementationAdRepository()
      }
    }
  }
}
