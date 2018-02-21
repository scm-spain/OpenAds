export default class PositionAlreadyExists extends Error {
  constructor ({id}) {
    super()
    this.message = `Position ${id} already exists`
    this.name = 'PositionAlreadyExists'
    this.stack = (new Error()).stack
  }
}
