import LogLevelLogger from './LogLevelLogger'
import LoggerFactory from '../../domain/logger/LoggerFactory'

export default class LogLevelLoggerFactory extends LoggerFactory {
  constructor ({logLevelInstance, logMessagePrefixInstance, loggerConfig = {}} = {}) {
    super()
    this._logLevelInstance = logLevelInstance
    this._logMessagePrefixInstance = logMessagePrefixInstance
    this._loggerConfig = loggerConfig
    this._prefixApplied = false
  }
  createLogger ({name}) {
    const loggerLevel = this._loggerConfig.Level || 'error'
    const loggerPrefixOptions = this._loggerConfig.PrefixOptions || {}

    if (!this._prefixApplied) {
      if (!loggerPrefixOptions.template) {
        loggerPrefixOptions.template = this._defaultPrefixTemplate()
      }
      if (!loggerPrefixOptions.timestampFormatter) {
        loggerPrefixOptions.timestampFormatter = this._defaultPrefixTimestampFormatter()
      }
      this._logMessagePrefixInstance.apply(this._logLevelInstance, loggerPrefixOptions)
      this._prefixApplied = true
    }

    const logger = this._logLevelInstance.getLogger(name)
    logger.setLevel(loggerLevel)

    return new LogLevelLogger({logLevel: logger})
  }

  _defaultPrefixTemplate () {
    return '[%t] %l | %n:'
  }

  _defaultPrefixTimestampFormatter () {
    return (date) => {
      const pad = (number, padding) => {
        const temp = padding + number
        return temp.substr(temp.length - padding.length)
      }
      return `${date.getFullYear()}-${pad(date.getMonth(), '00')}-${pad(date.getDay(), '00')} ${pad(date.getHours(), '00')}:${pad(date.getMinutes(), '00')}:${pad(date.getSeconds(), '00')}.${pad(date.getMilliseconds(), '000')}`
    }
  }
}
