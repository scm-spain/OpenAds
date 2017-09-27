/**
 * @interface
 */
export default class AdRepository {
  findAdsBySegmentation ({segmentation}) {
    throw new Error('AdRepository#must be implemented')
  }
}
