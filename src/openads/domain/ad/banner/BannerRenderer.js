/**
 * @interface
 */
export default class BannerRenderer {
  render ({containerId}) {
    throw new Error('BannerRenderer#render must be implemented')
  }
}
