export default class PositionAdNotAvailableError extends Error {
  constructor ({id}) {
    super()
    this.name = 'PositionAdNotAvailableError'
    this.message = `Position ${id} AD not available.`
    this.stack = (new Error()).stack
  }
}
