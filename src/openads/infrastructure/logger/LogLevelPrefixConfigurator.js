export default class LogLevelPrefixConfigurator {
  constructor ({logLevelPrefix, options = {}} = {}) {
    this._logLevelPrefix = logLevelPrefix
    this._options = options
  }

  applyPrefix ({logger} = {}) {
    if (logger) {
      if (!this._options.template) {
        this._options.template = this._defaultTemplate()
      }
      if (!this._options.timestampFormatter) {
        this._options.timestampFormatter = this._defaultTimestampFormatter()
      }
      this._logLevelPrefix.apply(logger, this._options)
    }
  }

  _defaultTemplate () {
    return '[%t] %l | %n:'
  }

  _defaultTimestampFormatter () {
    return (date) => {
      const pad = (number, format) => {
        const temp = format + number
        return temp.substr(temp.length - format.length)
      }
      return `${date.getFullYear()}-${pad(date.getMonth(), '00')}-${pad(date.getDay(), '00')} ${pad(date.getHours(), '00')}:${pad(date.getMinutes(), '00')}:${pad(date.getSeconds(), '00')}.${pad(date.getMilliseconds(), '000')}`
    }
  }
}
