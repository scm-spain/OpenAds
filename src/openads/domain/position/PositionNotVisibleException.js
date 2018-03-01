export default class PositionNotVisibleException extends Error {
  constructor ({position}) {
    super()
    this.name = 'PositionNotVisibleException'
    this.message = `Position ${position && position.id} not visible.`
    this.stack = (new Error()).stack
    this.position = position
  }
}
