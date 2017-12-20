export default class ResetConnectorsUseCase {
  constructor ({adChainedRepository}) {
    this._adChainedRepository = adChainedRepository
  }
  resetConnectors () {
    return this._adChainedRepository.reset()
  }
}
