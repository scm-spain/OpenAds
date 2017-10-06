import AdRepository from '../../domain/ad/AdRepository'

require('@schibstedspain/ast')

export default class AppNexusAdRepository extends AdRepository {
  constructor ({member}) {
    super()
    this._member = member
    this._appNexusClient = apntag
  }

  member () {
    return this._member
  }

  findAd ({target, ad, segmentation}) {
    console.log('AppNexusAdRepository - findAd', target, ad, segmentation)

    this._appNexusClient.debug = true
    this._appNexusClient.setPageOpts({
      member: this._member,
      keywords: segmentation
    })

    this._appNexusClient.onEvent('adAvailable', target, (adRetrieved) => this.processAdRetrieved({target, adRetrieved}))

    this._appNexusClient.defineTag({
      invCode: ad.code,
      sizes: ad.acceptedSizes,
      targetId: target
    })

    this._appNexusClient.loadTags()
  }

  // TODO this function out of the repository should be nice?
  processAdRetrieved ({target, adRetrieved}) {
    console.log('Ad Retrieved: ' + JSON.stringify(adRetrieved))
    this._appNexusClient.showTag(target)
  }
}
