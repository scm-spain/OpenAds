export default class PositionAdError extends Error {
  constructor({position = {}} = {}) {
    super()
    this.name = 'PositionAdError'
    let msg = position.ad && position.ad.data && position.ad.data.errMessage
    if (!msg && typeof position.ad.data === 'string') {
      msg = position.ad.data
    }
    this.message = `Error loading Ad ${position.id}: ${msg ||
      'unexpected error'}.`
    this.stack = new Error().stack
    this.position = position
  }
}
