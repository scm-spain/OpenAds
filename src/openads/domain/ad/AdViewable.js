/**
 * @interface
 */
export default class AdViewable {
  /**
   * Returns an empty Promise when the display operation has finished
   * @param {string} id The unique identifier of the position
   * @returns {Promise} Promise object representing when the operation finish
   */
  display ({id}) {
    throw new Error('AdViewable#display must be implemented')
  }

  /**
   * Returns and empty Promise when the refresh operation has finished
   * @param {string} id The unique identifier of the position
   * @param {segmentation} segmentation Data to be updated for the position
   * @returns {Promise} Promise object representing when the operation finish
   */
  refresh ({id, segmentation}) {
    throw new Error('AdViewable#refresh must be implemented')
  }
}
