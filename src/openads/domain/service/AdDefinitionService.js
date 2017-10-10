import AdDefinition from '../ad/AdDefinition'

/**
 * @interface
 */
export default class AdDefinitionService {
    /**
     *
     * @param {string} key
     * @return {AdDefinition}
     */
  adDefinition ({key}) {
    throw new Error('AdDefinitionService#adDefinition must be implemented')
  }
}
