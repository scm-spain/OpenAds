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

  /**
   * Resets any internal state to initial state
   */
  reset () {
    throw new Error('AdRepository#reset must be implemented')
  }
}
