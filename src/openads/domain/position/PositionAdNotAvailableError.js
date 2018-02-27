export default class PositionAdNotAvailableError extends Error {
  constructor ({position}) {
    super()
    this.name = 'PositionAdNotAvailableError'
    this.message = `Position ${position.id} AD not available.`
    this.stack = (new Error()).stack
    this.position = position
  }
}
