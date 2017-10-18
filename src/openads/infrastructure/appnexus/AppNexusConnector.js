import Connector from '../../domain/connector/Connector'

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
   * @param invCode
   * @param sizes
   * @param targetId
   */
  defineTag ({invCode, sizes, targetId}) {
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
}
