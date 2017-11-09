import Banner from './Banner'

export default class BannerFactory {
  /**
   *
   * @param {BannerRenderer} renderer
   */
  constructor ({appNexusBannerRenderer, eventDispatcher}) {
    this._appNexusBannerRenderer = appNexusBannerRenderer
    this._eventDispatcher = eventDispatcher
  }

  create ({containerId, position, source, content, size}) {
    return new Banner({
      containerId,
      position,
      source,
      content,
      size,
      renderer: this._resolveRenderer({source}),
      eventDispatcher: this._eventDispatcher
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
