export default class PositionNotFoundException extends Error {
  constructor({id}) {
    super()
    this.name = 'PositionNotFoundException'
    this.message = `Position ${id} not found.`
    this.stack = new Error().stack
  }
}
