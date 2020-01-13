/**
 * @class AppNexusConnectorMock
 * @implements AdLoadable
 * @implements AdViewable
 */
export default class AppNexusConnectorMock {
  loadAd({domElementId, placement, sizes, segmentation, native}) {
    return null
  }

  display({domElementId}) {
    return null
  }

  refresh({domElementId, placement, sizes, segmentation, native}) {
    return null
  }
}
