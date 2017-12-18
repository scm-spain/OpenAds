import Native from './Native'

export default class NativeFactory {
  /**
   *
   * @param {NativeRendererProcessor} renderer
   */
  constructor ({nativeRendererProcessor, eventDispatcher}) {
    this._nativeRendererProcessor = nativeRendererProcessor
    this._eventDispatcher = eventDispatcher
  }

  /**
   *
   * @param {string} containerId
   * @param {string} position
   * @param {string} source
   * @param {Object} json
   * @param {Array} impressionTrackers
   * @param {Array} clickTrackers
   * @param {string} viewabilityTrackers
   * @return {Native}
   */
  create ({containerId, position, source, json, impressionTrackers, clickTrackers, viewabilityTrackers}) {
    return new Native({
      containerId: containerId,
      position: position,
      source: source,
      json: json,
      impressionTrackers: impressionTrackers,
      clickTrackers: clickTrackers,
      viewabilityTrackers: viewabilityTrackers,
      renderer: this._nativeRendererProcessor.getRenderer({position}),
      eventDispatcher: this._eventDispatcher
    })
  }
}
