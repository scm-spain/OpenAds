export default class PositionAdIsNativeError extends Error {
  constructor ({id}) {
    super()
    this.name = 'PositionAdIsNativeError'
    this.message = `Position ${id} AD is Native.`
    this.stack = (new Error()).stack
  }
}
