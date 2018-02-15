export default class AppNexusConsumersRepository {
  constructor () {
    this._positions = new Map()
  }

  /**
   * Returns value stored from appnexus consumer by position id
   * @param {string} id
   * @returns {V | undefined}
   */
  find ({id}) {
    return this._positions.get(id)
  }

  /**
   * Save appnexus response from event
   * @param {string} id
   * @param {object} adResponse
   * @param {object} adResponse.data
   * @param {string} adResponse.status
   */
  save ({id, adResponse}) {
    this._positions.set(id, adResponse)
  }
}
