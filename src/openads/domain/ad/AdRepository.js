/**
 * @interface
 */
export default class AdRepository {
  findAd ({target, ad, segmentation}) {
    throw new Error('AdRepository#findAd must be implemented')
  }
}
