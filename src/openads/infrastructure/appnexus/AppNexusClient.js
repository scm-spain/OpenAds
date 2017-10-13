/**
 * @abstract
 */
export default class AppNexusClient {
  /**
   * Activates the Debug mode.
   */
  activateDebugMode () {
    throw new Error('AppNexusClient#activateDebugMode must be implemented')
  }

  /**
   * Sets page options.
   * @param member
   * @param keywords
   */
  setPageOpts ({member, keywords}) {
    throw new Error('AppNexusClient#setPageOpts must be implemented')
  }

  /**
   * Defines onEvent
   * @param event
   * @param targetId
   * @param callback
   */
  onEvent ({event, targetId, callback}) {
    throw new Error('AppNexusClient#onEvent must be implemented')
  }

  /**
   * Method to define tags.
   * @param invCode
   * @param sizes
   * @param targetId
   */
  defineTag ({invCode, sizes, targetId}) {
    throw new Error('AppNexusClient#defineTag must be implemented')
  }

  /**
   * Load tags.
   */
  loadTags () {
    throw new Error('AppNexusClient#loadTags must be implemented')
  }

  /**
   * Shows tags in the target.
   * @param target
   */
  showTag ({target}) {
    throw new Error('AppNexusClient#showTag must be implemented')
  }
}
