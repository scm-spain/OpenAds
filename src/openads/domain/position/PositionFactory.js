import Position from './Position'

export default class PositionFactory {
  create ({containerId, name, source, placement, segmentation, sizes, native}) {
    return new Position({
      containerId,
      name,
      source,
      placement,
      segmentation,
      sizes,
      native
    })
  }
}
