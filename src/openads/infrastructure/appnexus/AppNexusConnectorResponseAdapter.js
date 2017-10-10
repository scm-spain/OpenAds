import ResponseAdapter from '../../domain/connector/ResponseAdapter'

export default class AppNexusConnectorResponseAdapter extends ResponseAdapter {
  onAdRetrieved ({response}) {
    throw new Error('AppNexusConnectorResponseAdapter#onAdRetrieved must be implemented')
  }
}
