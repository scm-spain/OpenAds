/**
 * @interface
 */
export default class PositionRepository {
  /**
   * Given a domain position will store it or update it in persistence layer
   * @param {Position} page
   * @returns {Promise<Position>}
   */
  saveOrUpdate ({position}) {
    throw new Error('PositionRepository#save must be implemented')
  }
  /**
   * Given a position id will search it on persistence layer
   * @param {string} id
   */
  find ({id}) {
    throw new Error('PositionRepository#find must be implemented')
  }
}
