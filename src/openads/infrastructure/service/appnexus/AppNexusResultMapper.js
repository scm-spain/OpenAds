import Size from '../../../domain/ad/Size'

export default class AppNexusResultMapper {
  /**
   *
   * @param {BannerFactory} bannerFactory
   * @param {NativeFactory} nativeFactory
   */
  constructor ({bannerFactory, nativeFactory}) {
    this._bannerFactory = bannerFactory
    this._nativeFactory = nativeFactory
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
      case 'video': {
        return this._bannerFactory.create({
          containerId: appNexusResponse.targetId,
          position: position,
          source: 'AppNexus',
          content: appNexusResponse.video.content
        })
      }
      case 'native': {
        return this._nativeFactory.create({
          containerId: appNexusResponse.targetId,
          position: position,
          source: 'AppNexus',
          json: appNexusResponse.native,
          impressionTrackers: appNexusResponse.native.impressionTrackers,
          clickTrackers: appNexusResponse.native.clickTrackers
        })
      }
      default: {
        throw new Error('AdType not supported: ' + appNexusResponse.adType)
      }
    }
  }
}
