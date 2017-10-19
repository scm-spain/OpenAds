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
}
