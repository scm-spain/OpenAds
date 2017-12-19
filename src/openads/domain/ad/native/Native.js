import Ad from '../Ad'

export default class Native extends Ad {
    /**
     *
     * @param {string} containerId
     * @param {string} position
     * @param {string} source
     * @param {string} json
     * @param {Array} impressionTrackers
     * @param {Array} clickTrackers
     * @param {string} viewabilityTrackers
     * @param {NativeRenderer} renderer
     * @param {EventDispatcher} eventDispatcher
     */
  constructor ({containerId, position, source, json, impressionTrackers, clickTrackers, viewabilityTrackers, renderer, eventDispatcher}) {
    super()
    this._containerId = containerId
    this._position = position
    this._source = source
    this._json = json
    this._impressionTrackers = impressionTrackers
    this._clickTrackers = clickTrackers
    this._viewabilityTrackers = viewabilityTrackers
    this._renderer = renderer
    this._eventDispatcher = eventDispatcher
  }

  show () {
    this._eventDispatcher.dispatch({
      eventName: 'PRE_RENDER',
      position: this._position,
      payload: this
    })
    return this._renderer.render({
      containerId: this._containerId,
      json: this._json,
      impressionTrackers: this._impressionTrackers,
      clickTrackers: this._clickTrackers,
      viewabilityTrackers: this._viewabilityTrackers
    })
  }

  get containerId () {
    return this._containerId
  }

  get position () {
    return this._position
  }

  get source () {
    return this._source
  }

  get json () {
    return this._json
  }
}
