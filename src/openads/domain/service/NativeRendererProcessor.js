export default class NativeRendererProcessor {
  constructor ({nativeRendererFactory, logger}) {
    this._positionRenderers = {}
    this._nativeRendererFactory = nativeRendererFactory
    this._logger = logger
  }

  /**
     * @param {string} position
     * @callback {rendererCallback} renderer function
     */
  addPositionRenderer ({position, renderer}) {
    this._logger.info('Registering Native Renderer', '| position:', position)
    if (!position) {
      throw new Error('Position is required')
    }
    if (typeof renderer !== 'function') {
      throw new Error('Renderer must be a function')
    }
    this._positionRenderers[position] = this._nativeRendererFactory.create({
      clientRenderer: renderer
    })
  }

  removePositionRenderer ({position}) {
    this._logger.info('Unregistering Native Renderer', '| position:', position)
    delete this._positionRenderers[position]
  }

  hasRenderer ({position}) {
    return undefined !== this._positionRenderers[position]
  }

  getRenderer ({position}) {
    if (!this.hasRenderer({position})) {
      throw new Error(`No Renderer registered for position ${position}`)
    }
    return this._positionRenderers[position]
  }
}
