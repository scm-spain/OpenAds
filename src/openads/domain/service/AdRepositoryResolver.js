/**
 * @interface
 */
export default class AdRepositoryResolver {
  adRepository ({source}) {
    throw new Error('AdRepositoryResolver#getConnector must be implemented')
  }
}
