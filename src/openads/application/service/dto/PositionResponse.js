export default class PositionResponse {
  constructor ({id, name, source, placement, segmentation, sizes, native, ad, status} = {}) {
    this._id = id
    this._name = name
    this._source = source
    this._placement = placement
    this._segmentation = segmentation
    this._sizes = sizes
    this._native = native
    this._status = status
    this._ad = ad
  }

  static createFromPosition ({position, ad}) {
    return new PositionResponse({
      id: position.id,
      name: position.name,
      source: position.source,
      segmentation: position.segmentation,
      placement: position.placement,
      sizes: position.sizes,
      native: position.native,
      status: position.status,
      ad: ad
    })
  }

  get id () {
    return this._id
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

  get ad () {
    return this._ad
  }

  get status () {
    return this._status
  }
}
