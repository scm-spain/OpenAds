export default class PositionAdIsNativeError extends Error {
  constructor({position}) {
    super()
    this.name = 'PositionAdIsNativeError'
    this.message = `Position ${position && position.id} AD is Native.`
    this.stack = new Error().stack
    this.position = position
  }
}
