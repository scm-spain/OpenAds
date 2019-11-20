import QS from 'querystring'
import {Logger} from '@schibstedspain/openads-connector-api'
import InterfaceChecker from '../service/InterfaceChecker'

export default class LogLevelLoggerInitializer {
  constructor({loggerName, domDriver, logLevel, connectors = {}} = {}) {
    this._loggerName = loggerName
    this._domDriver = domDriver
    this._logLevel = logLevel
    this._connectors = connectors
  }
  logger() {
    const logger = this._logLevel.getLogger(this._loggerName)
    if (this._isDebugMode()) {
      logger.setLevel('debug')
      this._enableConnectorsDebug()
    } else {
      logger.setLevel('error')
    }
    return logger
  }
  _isDebugMode() {
    return (
      this._enableDebugFromLocalStorage() || this._enableDebugFromQueryString()
    )
  }
  _enableDebugFromLocalStorage() {
    return this._domDriver.getLocalStorageValue({key: DEBUG_KEY}) === 'true'
  }
  _enableDebugFromQueryString() {
    const queryString = this._domDriver.getQueryString()
    const parameters = QS.parse(queryString)
    return parameters[DEBUG_KEY] !== undefined
  }
  _enableConnectorsDebug() {
    Object.values(this._connectors).forEach(connector => {
      if (
        InterfaceChecker.implements({
          instance: connector,
          iface: Logger
        })
      ) {
        connector.enableDebug({debug: true})
      }
    })
  }
}
const DEBUG_KEY = 'openads_debug'
