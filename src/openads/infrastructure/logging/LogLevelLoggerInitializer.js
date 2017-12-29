import LogLevel from 'loglevel'
import LogMessagePrefix from 'loglevel-plugin-prefix'

export default class LogLevelLoggerInitializer {
  static createLogger ({config = {}} = {}) {
    const loggerName = config.Logger || 'OpenAds'
    const loggerLevel = config.Level || 'error'
    const loggerPrefixOptions = config.PrefixOptions || {}

    if (!loggerPrefixOptions.template) {
      loggerPrefixOptions.template = '[%t] %l | %n:'
    }
    if (!loggerPrefixOptions.timestampFormatter) {
      loggerPrefixOptions.timestampFormatter = (date) => {
        const addZero = (n) => n < 10 ? ('0' + n) : ('' + n)
        return `${date.getFullYear()}-${addZero(date.getMonth())}-${addZero(date.getDay())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}.${date.getMilliseconds()}`
      }
    }

    LogMessagePrefix.apply(LogLevel, loggerPrefixOptions)

    const openAdsLogger = LogLevel.getLogger(loggerName)
    openAdsLogger.setLevel(loggerLevel)

    return openAdsLogger
  }
}
