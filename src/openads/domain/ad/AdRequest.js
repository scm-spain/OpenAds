export default class AdRequest {
  constructor ({position, containerId, segmentation, placement, sizes}) {
    this._position = position
    this._containerId = containerId
    this._segmentation = segmentation
    this._placement = placement
    this._sizes = sizes
  }

  get position () {
    return this._position
  }

  get containerId () {
    return this._containerId
  }

  get segmentation () {
    return this._segmentation
  }

  get placement () {
    return this._placement
  }

  get sizes () {
    return this._sizes
  }
}
