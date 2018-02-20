export default class PositionNotVisibleException extends Error {
  constructor ({id}) {
    super()
    this.name = 'PositionNotVisibleException'
    this.message = `Position ${id} not visible.`
    this.stack = (new Error()).stack
  }
}
