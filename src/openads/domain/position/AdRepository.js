/**
 * @interface
 */
export default class AdRepository {
  /**
   * Returns the promise for the value stored from ad server by position id
   * @param {string} id
   * @returns {Promise.<V> | undefined}
   */
  find ({id}) {
    throw new Error('AdRepository#find must be implemented')
  }

  /**
   * Removes the value stored from ad server by position id
   * @param {string} id
   * @returns {V | undefined}
   */
  remove ({id}) {
    throw new Error('AdRepository#remove must be implemented')
  }

  /**
   * Save ad server response from event
   * @param {string} id
   * @param {object} adResponse
   * @param {object} adResponse.data
   * @param {string} adResponse.status
   */
  save ({id, adResponse}) {
    throw new Error('AdRepository#save must be implemented')
  }
}
