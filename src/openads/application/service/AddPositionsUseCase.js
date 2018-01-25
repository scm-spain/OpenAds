export default class AddPositionsUseCase {
  /**
     *
     * @param logger
     * @param {EventDispatcher} eventDispatcher
     * @param {PositionFactory} positionFactory
     * @param {PositionRepository} positionRepository
     */
  constructor ({logger, eventDispatcher, positionFactory, positionRepository}) {
    this._logger = logger
    this._eventDispatcher = eventDispatcher
    this._positionFactory = positionFactory
    this._positionRepository = positionRepository
  }
  addPositions (...positions) {
    return Promise.resolve()
      .then(() => this._logger.info('Add Positions', positions))
      .then(() => this._eventDispatcher.dispatch({eventName: 'START_ADD_POSITIONS'})) // TODO check if event dispatcher supports events without position and payload
      .then(() => Promise.all(positions.map(position => this._createExisingPosition({position}))))
      .then(() => this._eventDispatcher.dispatch({eventName: 'END_ADD_POSITIONS'}))
  }
  _createExisingPosition ({position}) {
    return this._positionRepository.exists({containerId: position.containerId})
      .then(exist => {
        if (!exist) {
          return this._mapInputToDomainPosition({input: position})
            .then(domainPosition => this._positionRepository.create({position: domainPosition}))
        } else {
          return Promise.resolve()
            .then(() => this._logger.warn('Will not Add Position for containerId: ', position.containerId, ' because it exists. Use the Modify Position instead.'))
        }
      })
  }
  _mapInputToDomainPosition ({input}) {
    return this._positionFactory.create({
      containerId: input.containerId,
      name: input.name,
      source: input.source,
      segmentation: input.segmentation,
      placement: input.placement,
      sizes: input.sizes,
      native: input.native
    })
  }
}
