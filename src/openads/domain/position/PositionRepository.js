/**
 * @interface
 */
export default class PositionRepository {
  /**
   * Given a domain position will store it or update it in persistence layer
   * @param {Position} page
   * @returns {Promise<Position>}
   */
  saveOrUpdate({position}) {
    throw new Error('PositionRepository#save must be implemented')
  }
  /**
   * Given a position id will search it on persistence layer
   * @param {Promise<Position>} id
   */
  find({id}) {
    throw new Error('PositionRepository#find must be implemented')
  }
  /**
   * Checks for the existence of a Position by id
   * @param id
   * @return {Promise<boolean>}
   */
  has({id}) {
    throw new Error('PositionRepository#has must be implemented')
  }
}
