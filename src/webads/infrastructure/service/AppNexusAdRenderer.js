import AdRenderer from '../../domain/service/AdRenderer'

export default class AppNexusAdRenderer extends AdRenderer {
  constructor ({appNexusClient}) {
    super()
    this._appNexusClient = appNexusClient
  }

  render ({ads}) {
    // Do some stuff like render ads using appnexus implementation (apntag.showTag)

    // console.log('ADS=' + JSON.stringify(ads))

    const tag = this.sampleTag()

    this._appNexusClient.setPageOpts({
      member: 3296,
      keywords: []
    })

    let adRetrieveFunc = (adRetrieved) => this.processAdRetrieved({adRetrieved})

    this._appNexusClient.onEvent('adAvailable', tag.targetId, adRetrieveFunc)

    console.log('DEFINE TAGS: ', this._appNexusClient.defineTag(tag))

    this._appNexusClient.loadTags()
  }

  sampleTag () {
    return {
      invCode: 'es-ma-wde-marketplace-list-top_1',
      sizes: [[970, 90], [980, 90], [728, 90]],
      targetId: 'top1div'
    }
  }

  processAdRetrieved ({adRetrieved}) {
    console.log('Ad Retrieved: ' + JSON.stringify(adRetrieved))
    this._appNexusClient.showTag('top1div')
  }
}
