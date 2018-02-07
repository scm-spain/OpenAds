import Position from 'Position'

export default class PositionFactory {
  create ({id, name, source, placement, segmentation, sizes, native}) {
    return new Position({id, name, source, placement, segmentation, sizes, native})
  }
}
