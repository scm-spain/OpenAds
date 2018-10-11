import PositionRepository from '../../domain/position/PositionRepository'

export default class InMemoryPositionRepository extends PositionRepository {
  constructor({positions = [[]]} = {}) {
    super()
    this._positions = new Map(positions)
  }

  /**
   * Store the position in memory
   * @param {Position} position
   * @returns {Promise<Position>}
   */
  saveOrUpdate({position}) {
    return Promise.resolve()
      .then(() => this._positions.set(position.id, position))
      .then(() => position)
  }
  /**
   * Find a Position by id
   * @param {string} id
   * @returns {Promise<Position>}
   */
  find({id}) {
    return Promise.resolve().then(
      () => this._positions.has(id) && this._positions.get(id)
    )
  }
}
