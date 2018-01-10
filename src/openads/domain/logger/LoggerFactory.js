/**
 * @interface
 */
export default class LoggerFactory {
  createLogger ({name}) {
    throw new Error('LoggerFactory#createLogger must be implemented')
  }
}
