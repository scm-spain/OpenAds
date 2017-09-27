import AdRenderer from '../../domain/service/AdRenderer'

export default class AppNexusAdRenderer extends AdRenderer {
  constructor ({appNexusClient}) {
    super()
    this._appNexusClient = appNexusClient
  }

  render ({ads}) {
    // Do some stuff like render ads using appnexus implementation (apntag.showTag)
    this._appNexusClient.showTag()
  }
}
