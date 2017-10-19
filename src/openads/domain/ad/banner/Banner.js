import Ad from '../Ad'

export default class Banner extends Ad {
    /**
     *
     * @param {string} containerId
     * @param {string} source
     * @param {string} content
     * @param {Size} size
     * @param {BannerRenderer} renderer
     */
  constructor ({containerId, source, content, size, renderer}) {
    super()
    this._containerId = containerId
    this._source = source
    this._content = content
    this._size = size
    this._renderer = renderer
  }

  show () {
    return this._renderer.render({
      containerId: this._containerId,
      content: this._content,
      size: this._size
    })
  }

  get containerId () {
    return this._containerId
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
