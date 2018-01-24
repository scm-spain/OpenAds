/**
 * @interface
 */
export default class AdRepository {
  /**
   *
   * @param {AdRequest} adRequest
   * @returns {Promise<Ad>}
   */
  findAd ({adRequest}) {
    throw new Error('AdRepository#findAd must be implemented')
  }
}
