export default class PositionAdError extends Error {
  constructor({position = {}} = {}) {
    super()
    this.name = 'PositionAdError'
    this.message = `Error loading Ad ${position.id}: ${(position.ad &&
      position.ad.data &&
      position.ad.data.errMessage) ||
      'unexpected error'}.`
    this.stack = new Error().stack
    this.position = position
  }
}
