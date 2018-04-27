/**
 * @interface
 */
export default class AdLoadable {
  /**
   * Returns the Ad loaded
   * @param {string} domElementId
   * @param {string} placement
   * @param {Array<Array<number,number>>} sizes
   * @param {string} segmentation
   * @param {Object} native - Fields requested to the ad server
   */
  loadAd ({domElementId, placement, sizes, segmentation, native}) {
    throw new Error('AdLoadable#loadAd must be implemented')
  }
}
