import PositionRepository from '../../domain/position/PositionRepository'

export default class InMemoryPositionRepository extends PositionRepository {
  constructor () {
    super()
    this._positions = new Map()
  }

  /**
   * Store the position in memory
   * @param {Position} position
   * @returns {Promise<Position>}
   */
  save ({position}) {
    return this.find({id: position.id})
      .then(position => {
        if (position !== null) throw new Error('PositionAlreadyExists')
      })
      .then(() => this._positions.set(position.id, position))
      .then(() => position)
  }

  /**
   * Find a Position by id
   * @param {string} id
   * @returns {Promise<Position>}
   */
  find ({id}) {
    return Promise.resolve()
      .then(() => this._positions.has(id))
      .then(exists => exists ? this._positions.get(id) : null)
  }
}