export default class InvalidPositionSpecificationError extends Error {
  constructor({message}) {
    super()
    this.name = 'InvalidPositionSpecificationError'
    this.message = message
    this.stack = new Error().stack
  }
}
