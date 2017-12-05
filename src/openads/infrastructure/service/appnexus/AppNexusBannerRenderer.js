import BannerRenderer from '../../../domain/ad/banner/BannerRenderer'

export default class AppNexusBannerRenderer extends BannerRenderer {
    /**
     *
     * @param {AppNexusConnector} appNexusConnector
     * @param {DOMDriver} domDriver
     */
  constructor ({appNexusConnector, domDriver}) {
    super()
    this._appNexusConnector = appNexusConnector
    this._domDriver = domDriver
  }

  render ({containerId}) {
    return new Promise((resolve, reject) => {
      this._cleanContainer({containerId})
      this._appNexusConnector
        .onEvent({
          event: 'adLoaded',
          targetId: containerId,
          callback: (adRetrieved) => resolve(true)
        })
        .showTag({target: containerId})
    })
  }

  _cleanContainer ({containerId}) {
    const container = this._domDriver.getElementById({id: containerId})
    if (container !== null) {
      container.innerHTML = ''
    }
  }
}
