import Logger from '../../domain/logger/Logger'
import LogLevel from 'loglevel'

export default class LogLevelLogger extends Logger {
  constructor ({logLevel}) {
    super()
    this._logLevel = logLevel
  }

  debug (...message) {
    return this._logLevel.debug(message)
  }

  info (...message) {
    return this._logLevel.info(message)
  }

  warn (...message) {
    return this._logLevel.warn(message)
  }

  error (...message) {
    return this._logLevel.error(message)
  }

  setLevel (level) {
    this._logLevel.setLevel(this._mapLevel(level))
  }

  isDebugEnabled () {
    return this._logLevel.getLevel() <= LogLevel.levels.DEBUG
  }

  isInfoEnabled () {
    return this._logLevel.getLevel() <= LogLevel.levels.INFO
  }

  isWarnEnabled () {
    return this._logLevel.getLevel() <= LogLevel.levels.WARN
  }

  isErrorEnabled () {
    return this._logLevel.getLevel() <= LogLevel.levels.ERROR
  }
  _mapLevel (level) {
    switch (level) {
      case Logger.LEVELS.DEBUG: {
        return 'debug'
      }
      case Logger.LEVELS.INFO: {
        return 'info'
      }
      case Logger.LEVELS.WARN: {
        return 'warn'
      }
      case Logger.LEVELS.ERROR: {
        return 'error'
      }
      default: {
        return 'silent'
      }
    }
  }
}
