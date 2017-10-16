/**
 * @interface
 */
export default class ResponseAdapter {
  onAdRetrieved ({adResponse}) {
    throw new Error('ResponseAdapter#onAdRetrieved must be implemented')
  }

  onAdFailed ({targetId, adDefinition}) {
    throw new Error('ResponseAdapter#onAdFailed must be implemented')
  }
}
