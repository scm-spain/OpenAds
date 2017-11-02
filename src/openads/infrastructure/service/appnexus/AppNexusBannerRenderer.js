import BannerRenderer from '../../../domain/ad/banner/BannerRenderer'

export default class AppNexusBannerRenderer extends BannerRenderer {
    /**
     *
     * @param {AppNexusConnector} appNexusConnector
     */
  constructor ({appNexusConnector}) {
    super()
    this._appNexusConnector = appNexusConnector
  }

  render ({containerId}) {
    return new Promise((resolve, reject) => {
      this._appNexusConnector
        .onEvent({
          event: 'adLoaded',
          targetId: containerId,
          callback: (adRetrieved) => resolve(true)
        })
        .showTag({target: containerId})
    })
  }
}
