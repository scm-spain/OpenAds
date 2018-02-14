export default class AppNexusErrorException extends Error {
  constructor ({message, cause, status}) {
    super(message)
    this.cause = cause
    this.status = status
  }
}
