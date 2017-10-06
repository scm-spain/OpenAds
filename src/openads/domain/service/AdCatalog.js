/**
 * @interface
 */
export default class AdCatalog {
  ad ({code}) {
    throw new Error('AdCatalog#getByCode must be implemented')
  }
}
