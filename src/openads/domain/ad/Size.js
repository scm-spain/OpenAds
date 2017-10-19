export default class Size {
  constructor ({width, height}) {
    this._width = width
    this._height = height
  }

  get width () {
    return this._width
  }

  get height () {
    return this._height
  }
}
