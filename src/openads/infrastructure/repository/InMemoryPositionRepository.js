import PositionRepository from '../../domain/position/PositionRepository'

export default class InMemoryPositionRepository extends PositionRepository {
  constructor ({logger}) {
    super()
    this._logger = logger
    this._db = new Map()
  }

  create ({containerId, name, source, placement, segmentation, sizes, native}) {
    return Promise.resolve()
      .then(() => this._logger.debug('Position Repository | create', '| containerId:', containerId, '| name:', name, '| source:', source, '| placement:', placement, '| segmentation:', segmentation, '| sizes:', sizes, '| native:', native))
      .then(() => {
        if (!this._db.has(containerId)) {
          this._db.set(containerId, {containerId, name, source, placement, segmentation, sizes, native})
        } else {
          throw new Error('Attempting to create duplicated Position for containerId: ' + containerId)
        }
      })
  }

  exists ({containerId}) {
    return Promise.resolve(this._db.has(containerId))
  }
}
