export default class AppNexusErrorException extends Error {
  constructor ({cause, status, position}) {
    super(`Some error ocurred in appnexus with position id: ${position} `)
    this.cause = cause
    this.status = status
  }
}
