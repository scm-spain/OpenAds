/**
 * @interface
 */
export default class AdRepository {
  /**
   *
   * @param {AdRequest} adRequest
   */
  findAd ({adRequest}) {
    throw new Error('AdRepository#findAd must be implemented')
  }
}
