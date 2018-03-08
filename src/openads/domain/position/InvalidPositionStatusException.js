export default class InvalidPositionStatusException extends Error {
  constructor ({position, status}) {
    super()
    this.name = 'InvalidPositionStatusException'
    this.message = `Invalid Position Status: ${status}`
    this.stack = (new Error()).stack
    this.position = position
  }
}
