/**
 * @abstract
 */
export default class Logger {
  debug (message) {
    throw new Error('Logger#debug must be implemented')
  }
  isDebugEnabled () {
    throw new Error('Logger#isDebugEnabled must be implemented')
  }
  info (message) {
    throw new Error('Logger#info must be implemented')
  }
  isInfoEnabled () {
    throw new Error('Logger#isInfoEnabled must be implemented')
  }
  warn (message) {
    throw new Error('Logger#warn must be implemented')
  }
  isWarnEnabled () {
    throw new Error('Logger#isWarnEnabled must be implemented')
  }
  error (message) {
    throw new Error('Logger#error must be implemented')
  }
  isErrorEnabled () {
    throw new Error('Logger#isErrorEnabled must be implemented')
  }
  setLevel (level) {
    throw new Error('Logger#setLevel must be implemented')
  }
  static get LEVELS () {
    return LEVELS
  }
}
const LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  OFF: 'off'
}
