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

  create ({containerId, position, source, json, impressionTrackers, clickTrackers}) {
    return new Native({
      containerId: containerId,
      position: position,
      source: source,
      json: json,
      impressionTrackers: impressionTrackers,
      clickTrackers: clickTrackers,
      renderer: this._nativeRendererProcessor.getRenderer({position}),
      eventDispatcher: this._eventDispatcher
    })
  }
}
