export default class PositionAdError extends Error {
  constructor({position = {}} = {}) {
    super()
    this.name = 'PositionAdError'
    const errorMessage =
      position.ad &&
      position.ad.data &&
      (typeof position.ad.data === 'string'
        ? position.ad.data
        : position.ad.data.errMessage || 'unexpected error')
    this.message = `Error loading Ad ${position.id}: ${errorMessage}.`
    this.stack = new Error().stack
    this.position = position
  }
}
