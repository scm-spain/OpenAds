import Connector from '../../../domain/connector/Connector'

/**
 * @abstract
 */
export default class AppNexusConnector extends Connector {
  /**
   * Activates the Debug mode.
   */
  activateDebugMode () {
    throw new Error('AppNexusConnector#activateDebugMode must be implemented')
  }

  /**
   * Sets page options.
   * @param member
   * @param keywords
   */
  setPageOpts ({member, keywords}) {
    throw new Error('AppNexusConnector#setPageOpts must be implemented')
  }

  /**
   * Defines onEvent
   * @param event
   * @param targetId
   * @param callback
   */
  onEvent ({event, targetId, callback}) {
    throw new Error('AppNexusConnector#onEvent must be implemented')
  }

  /**
   * Method to define tags.
   * @param member
   * @param targetId
   * @param invCode
   * @param sizes
   * @param keywords
   * @param native
   */
  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    throw new Error('AppNexusConnector#defineTag must be implemented')
  }

  /**
   * Load tags.
   */
  loadTags () {
    throw new Error('AppNexusConnector#loadTags must be implemented')
  }

  /**
   * Shows tags in the target.
   * @param target
   */
  showTag ({target}) {
    throw new Error('AppNexusConnector#showTag must be implemented')
  }

  /**
   * Resets the state to it's pre uninitialized state.
   */
  reset () {
    throw new Error('AppNexusConnector#clearRequest must be implemented')
  }

  /**
   * Refreshes ads on the page.
   * @param target : an array of ids
   */
  refresh (target) {
    throw new Error('AppNexusConnector#refresh must be implemented')
  }

  /**
   * Updates tag information.
   * @param targetId : an array of ids
   * @param data : the data to update
   * @param data.member
   * @param data.invCode
   * @param data.sizes
   * @param data.keywords
   * @param data.native
   */
  modifyTag ({targetId, data}) {
    throw new Error('AppNexusConnector#modifyTag must be implemented')
  }
}
