/**
 * @interface
 */
import RequestAdapter from '../../domain/connector/RequestAdapter'

export default class AppNexusConnectorRequestAdapter extends RequestAdapter {
  keywords ({adDefinition}) {
    throw new Error('AppNexusConnectorRequestAdapter#keywords must be implemented')
  }

  invCode ({adDefinition}) {
    throw new Error('AppNexusConnectorRequestAdapter#invCode must be implemented')
  }

  sizes ({adDefinition}) {
    throw new Error('AppNexusConnectorRequestAdapter#sizes must be implemented')
  }
}
