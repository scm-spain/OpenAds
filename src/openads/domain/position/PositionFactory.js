/**
 * @Interface
 */
export default class PositionFactory {
  create ({id, name, source, placement, segmentation, sizes, native, ad, status}) {
    throw new Error('PositionFactory#create must be implemented')
  }
}
