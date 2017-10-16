const HTML = 'HTML'
const NATIVE = 'Native'
export default class AdResponse {
  constructor ({responseType, targetId, adDefinition, adRetrieved}) {
    this._responseType = responseType
    this._targetId = targetId
    this._adDefinition = adDefinition
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
  get targetId () {
    return this._targetId
  }
  get adDefinition () {
    return this._adDefinition
  }
  get adRetrieved () {
    return this._adRetrieved
  }
}
