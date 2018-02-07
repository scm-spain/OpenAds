import PositionRepository from '../../domain/page/PositionRepository'

export default class InMemoryPositionRepository extends PositionRepository {
  constructor () {
    super()
    this._positions = new Map()
  }

  save ({position}) {
    return Promise.resolve()
      .then(() => this._positions.set(position.id, position))
  }

  find ({id}) {
    return Promise.resolve()
      .then(() => this._positions.has(id))
      .then(exists => exists ? this._positions.get(id) : null)
  }
}
