import Size from '../../../domain/ad/Size'

export default class AppNexusResultMapper {
  /**
   *
   * @param {BannerFactory} bannerFactory
   */
  constructor ({bannerFactory}) {
    this._bannerFactory = bannerFactory
  }

    /**
     *
     * @param {string} position
     * @param {string} appNexusResponse.targetId
     * @param {string} appNexusResponse.adType
     * @param {string} appNexusResponse.banner.content
     * @param {string} appNexusResponse.width
     * @param {string} appNexusResponse.height
     */
  mapResponseToDomain ({position, appNexusResponse}) {
    switch (appNexusResponse.adType) {
      case 'banner': {
        return this._bannerFactory.create({
          containerId: appNexusResponse.targetId,
          position: position,
          source: 'AppNexus',
          content: appNexusResponse.banner.content,
          size: new Size({
            width: appNexusResponse.width,
            height: appNexusResponse.height
          })
        })
      }
      default: {
        throw new Error('AdType not supported: ' + appNexusResponse.adType)
      }
    }
  }
}
