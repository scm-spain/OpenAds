import Banner from './Banner'

export default class BannerFactory {
  /**
   *
   * @param {BannerRenderer} renderer
   */
  constructor ({appNexusBannerRenderer}) {
    this._appNexusBannerRenderer = appNexusBannerRenderer
  }

  create ({containerId, source, content, size}) {
    return new Banner({
      containerId,
      source,
      content,
      size,
      renderer: this._resolveRenderer({source})
    })
  }

  _resolveRenderer ({source}) {
    switch (source) {
      case 'AppNexus': {
        return this._appNexusBannerRenderer
      }
      default: {
        throw new Error('BannerRenderer not supported for source: ' + source)
      }
    }
  }
}
