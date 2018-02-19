export default class PositionAlreadyExists extends Error {
  constructor ({id}) {
    super()
    this.name = 'PositionAlreadyExists'
    this.message = `Position ${id} already exists`
    this.stack = (new Error()).stack
  }
}
