export default class AdDefinition {
  constructor ({key, source, configuration}) {
    this._key = key
    this._source = source
    this._configuration = configuration
  }
  get key () {
    return this._key
  }
  get source () {
    return this._source
  }
  get configuration () {
    return this._configuration
  }
}
