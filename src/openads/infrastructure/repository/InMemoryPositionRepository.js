import PositionRepository from '../../domain/position/PositionRepository'

export default class InMemoryPositionRepository extends PositionRepository {
  constructor ({logger}) {
    super()
    this._logger = logger
    this._db = new Map()
  }

  create ({position}) {
    return Promise.resolve()
      .then(() => this._logger.debug('Position Repository | create', position))
      .then(() => {
        if (!this._db.has(position.containerId)) {
          this._db.set(position.containerId, position)
        } else {
          throw new Error('Attempting to create duplicated Position for containerId: ' + position.containerId)
        }
      })
  }

  exists ({containerId}) {
    return Promise.resolve(this._db.has(containerId))
  }
}
