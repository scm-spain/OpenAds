import PositionFactory from '../../domain/position/PositionFactory'
import Position from '../../domain/position/Position'

export default class ProxyPositionFactory extends PositionFactory {
  constructor ({proxyHandler}) {
    super()
    this._proxyHandler = proxyHandler
  }

  create ({id, name, source, placement, segmentation, sizes, native, ad, status}) {
    return new Proxy(
      new Position({
        id,
        name,
        source,
        placement,
        segmentation,
        sizes,
        native,
        ad,
        status
      }),
      this._proxyHandler
    )
  }
}
