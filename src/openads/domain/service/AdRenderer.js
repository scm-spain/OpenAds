/**
 * @interface
 */
export default class AdRenderer {
  render ({ads}) {
    throw new Error('DOMDriver#must be implemented')
  }
}
