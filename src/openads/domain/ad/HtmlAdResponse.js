import AdResponse from './AdResponse'

export default class HtmlAdResponse extends AdResponse {
  constructor ({source, adRetrieved, renderFunction}) {
    super({
      responseType: AdResponse.HTML,
      source: source,
      adRetrieved: adRetrieved
    })
    this._renderFunction = renderFunction
  }

  show () {
    if (undefined !== this._renderFunction) {
      this._renderFunction()
    }
  }

  size () {
    return {
      width: this.adRetrieved.width,
      height: this.adRetrieved.height
    }
  }
}
