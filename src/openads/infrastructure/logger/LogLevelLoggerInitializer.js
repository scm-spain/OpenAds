export default class LogLevelLoggerInitializer {
  /**
   *
   * @param {PrefixConfigurator} prefixConfigurator
   * @param {LoggerLevelConfigurator} loggerLevelConfigurator
   */
  constructor ({loggerPrefixConfigurator, loggerLevelConfigurator}) {
    this._loggerPrefixConfigurator = loggerPrefixConfigurator
    this._loggerLevelConfigurator = loggerLevelConfigurator
  }

  logger ({loggerName}) {
    const loggerInstance = this._loggerLevelConfigurator.init({loggerName: loggerName})
    this._loggerPrefixConfigurator.applyPrefix({logger: loggerInstance})
    return loggerInstance
  }
}
