import PositionFactory from '../../domain/position/PositionFactory'
import Position from '../../domain/position/Position'

export default class DefaultPositionFactory extends PositionFactory {
  create({id, name, specification, ad, status}) {
    return new Position({
      id,
      name,
      specification,
      ad,
      status
    })
  }
}
