import AdResponse from './AdResponse'

export default class HtmlAdResponse extends AdResponse {
  constructor ({targetId, adDefinition, adRetrieved, showAdCallback}) {
    super({responseType: AdResponse.HTML, targetId, adDefinition, adRetrieved})
    this._showAdCallback = showAdCallback
  }

  show () {
    if (typeof (this._showAdCallback) !== 'undefined') {
      this._showAdCallback()
    }
  }
}
