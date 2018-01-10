import Logger from '../logger/Logger'

export default class LoggerInitializer {
  constructor ({logger, contextParametersService}) {
    this._logger = logger
    this._contextParametersService = contextParametersService
    this._init()
  }
  _init () {
    const contextParameters = this._contextParametersService.getContextParameters()
    if (contextParameters.hasOwnProperty(OPENADS_DEBUG_KEY)) {
      this._logger.setLevel(Logger.LEVELS.DEBUG)
    }
  }
}
const OPENADS_DEBUG_KEY = 'openads_debug'
