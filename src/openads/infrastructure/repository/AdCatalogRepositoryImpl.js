import AdCatalog from '../../domain/service/AdCatalog'

export default class AdCatalogRepositoryImpl extends AdCatalog {
  constructor ({ads}) {
    super()
    this._ads = {}
    if (ads !== null) {
      for (let ad of ads) {
        this._ads[ad.code] = ad
      }
    }
  }
  ad ({code}) {
    let ad = this._ads[code]
    if (ad === null) {
      throw new Error('Ad Not Found for: ' + code)
    }
    return ad
  }
}
