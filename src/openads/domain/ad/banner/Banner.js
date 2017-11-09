import Ad from '../Ad'

export default class Banner extends Ad {
  /**
   *
   * @param {string} containerId
   * @param {string} position
   * @param {string} source
   * @param {string} content
   * @param {Size} size
   * @param {BannerRenderer} renderer
   * @param {EventDispatcher} eventDispatcher
   */
  constructor ({containerId, position, source, content, size, renderer, eventDispatcher}) {
    super()
    this._containerId = containerId
    this._position = position
    this._source = source
    this._content = content
    this._size = size
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
      containerId: this._containerId
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

  get content () {
    return this._content
  }

  get size () {
    return this._size
  }
}
