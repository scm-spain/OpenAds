export default class ResetConnectorsUseCase {
  constructor ({adChainedRepository, logger}) {
    this._adChainedRepository = adChainedRepository
    this._logger = logger
  }
  resetConnectors () {
    return Promise.resolve()
      .then(() => this._logger.info('Reset connectors'))
      .then(() => this._adChainedRepository.reset())
  }
}
