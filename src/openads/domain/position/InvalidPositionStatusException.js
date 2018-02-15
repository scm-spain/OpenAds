export default class InvalidPositionStatusException extends Error {
  constructor ({status}) {
    super(`Invalid Position Status: ${status}`)
    this.name = 'InvalidPositionStatusException'
  }
}
