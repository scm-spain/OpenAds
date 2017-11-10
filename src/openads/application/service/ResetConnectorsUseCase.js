export default class ResetConnectorsUseCase {
  constructor ({adChainedRepository}) {
    this._adChainedRepository = adChainedRepository
  }
  resetConnectors () {
    this._adChainedRepository.reset()
  }
}
