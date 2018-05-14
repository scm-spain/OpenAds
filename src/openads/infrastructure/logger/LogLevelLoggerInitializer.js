import QS from 'querystring'
import {Logger} from '@schibstedspain/openads-connector-api'
import InterfaceChecker from '../service/InterfaceChecker'

export default class LogLevelLoggerInitializer {
  constructor ({loggerName, domDriver, logLevel, connectors = {}} = {}) {
    this._loggerName = loggerName
    this._domDriver = domDriver
    this._logLevel = logLevel
    this._connectors = connectors
  }
  logger () {
    const logger = this._logLevel.getLogger(this._loggerName)
    if (this._isDebugMode()) {
      logger.setLevel('debug')
      this._enableConnectorsDebug()
    } else {
      logger.setLevel('error')
    }
    return logger
  }
  _isDebugMode () {
    const queryString = this._domDriver.getQueryString()
    const parameters = QS.parse(queryString)
    return parameters[this._loggerName.toLowerCase() + '_debug'] !== undefined
  }
  _enableConnectorsDebug () {
    Object.values(this._connectors).forEach(connector => {
      if (InterfaceChecker.implements({
        instance: connector,
        iface: Logger})) {
        connector.enableDebug({debug: true})
      }
    })
  }
}
