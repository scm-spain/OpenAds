import AdRepository from '../../domain/ad/AdRepository'

export default class MissingImplementationAdRepository extends AdRepository {
  findAd ({target, ad, segmentation}) {
    // TODO we've to talk about how the behaviou must be here
    console.log('Connector not able to retrieve Ads')
  }
}
