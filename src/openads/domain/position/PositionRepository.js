export default class PositionRepository {
  create ({containerId, name, source, placement, segmentation, sizes, native}) {
    throw new Error('PositionRepository#create must be implemented')
  }
  exists ({containerId}) {
    throw new Error('PositionRepository#exists must be implemented')
  }
}
