export default class ResetConnectorsUseCase {
  constructor ({adChainedRepository, logger}) {
    this._adChainedRepository = adChainedRepository
    this._logger = logger
  }
  resetConnectors () {
    this._logger.info('Reset connectors')
    return this._adChainedRepository.reset()
  }
}
