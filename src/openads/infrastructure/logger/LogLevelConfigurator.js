import QS from 'querystring'

export default class LogLevelConfigurator {
  constructor ({domDriver, logLevel, options = {}}) {
    this._domDriver = domDriver
    this._logLevel = logLevel
    this._options = options
  }
  init ({loggerName} = {}) {
    const logger = this._logLevel.getLogger(loggerName)
    if (this._enableDebug({loggerName})) {
      logger.setLevel('debug')
    } else {
      const level = this._options.Level || 'error'
      logger.setLevel(level)
    }
    return logger
  }
  _enableDebug ({loggerName}) {
    const queryString = this._domDriver.getQueryString()
    const parameters = QS.parse(queryString)
    return parameters[loggerName.toLowerCase() + '_debug'] !== undefined
  }
}
