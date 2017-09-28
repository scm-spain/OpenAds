import AdRenderer from '../../domain/service/AdRenderer'

export default class AppNexusAdRenderer extends AdRenderer {
  constructor ({appNexusClient}) {
    super()
    this._appNexusClient = appNexusClient
  }

  render ({ads}) {
    // Do some stuff like render ads using appnexus implementation (apntag.showTag)
    console.log(this._appNexusClient.defineTag({
      invCode: 'ABC1234',
      sizes: [728,90],
      targetId: 'apn_ad_slot_1'
    }));
  }
}
