import NativeRenderer from './NativeRenderer'

export default class NativeRendererFactory {
  constructor ({domDriver}) {
    this._domDriver = domDriver
  }

  create ({clientRenderer}) {
    return new NativeRenderer({
      domDriver: this._domDriver,
      clientRenderer
    })
  }
}
