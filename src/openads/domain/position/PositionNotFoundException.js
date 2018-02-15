export default class PositionNotFoundException extends Error {
  constructor ({id}) {
    super(`Position ${id} not found.`)
    this.name = 'PositionNotFoundException'
  }
}
