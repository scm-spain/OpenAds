const HTML = 'HTML'
const NATIVE = 'Native'
export default class AdResponse {
  constructor ({responseType, source, adRetrieved}) {
    this._responseType = responseType
    this._source = source
    this._adRetrieved = adRetrieved
  }
  static get HTML () {
    return HTML
  }
  static get NATIVE () {
    return NATIVE
  }
  get responseType () {
    return this._responseType
  }
  get source () {
    return this._source
  }
  get adRetrieved () {
    return this._adRetrieved
  }
}
