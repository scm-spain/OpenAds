export default class Position {
  constructor ({containerId, name, source, placement, segmentation, sizes, native}) {
    if (!containerId) {
      throw new Error('Container Id is required as Position identifier')
    }
    if (!source) {
      throw new Error('Position Source is required')
    }
    this._containerId = containerId
    this._name = name
    this._source = source
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes
    this._native = native
  }

  get containerId () {
    return this._containerId
  }

  get name () {
    return this._name
  }

  get source () {
    return this._source
  }

  get placement () {
    return this._placement
  }

  get segmentation () {
    return this._segmentation
  }

  get sizes () {
    return this._sizes
  }

  get native () {
    return this._native
  }
}
