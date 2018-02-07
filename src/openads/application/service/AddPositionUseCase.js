export default class AddPositionUseCase {
  constructor ({positionRepository, positionFactory}) {
    this._positionRepository = positionRepository
    this._positionFactory = positionFactory
  }

  addPosition ({id, name, source, placement, segmentation, sizes, native}) {
    return Promise.resolve()
      .then(() => this._positionFactory.create({id, name, source, placement, segmentation, sizes, native}))
      .then(position => this._positionRepository.save({position}))
  }
}
