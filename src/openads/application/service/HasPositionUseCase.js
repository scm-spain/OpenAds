export default class HasPositionUseCase {
  constructor({positionRepository}) {
    this._positionRepository = positionRepository
  }

  hasPosition({id}) {
    return this._positionRepository.has({id})
  }
}
