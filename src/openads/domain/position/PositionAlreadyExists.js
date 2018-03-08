export default class PositionAlreadyExists extends Error {
  constructor ({position}) {
    super()
    this.message = `Position ${position && position.id} already exists`
    this.name = 'PositionAlreadyExists'
    this.stack = (new Error()).stack
    this.position = position
  }
}
