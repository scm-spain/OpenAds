import AdResponse from './AdResponse'

export default class NativeAdResponse extends AdResponse {
  // TODO when Native responses are developed in next iterations, it should delegate the 'show' itself to a renderer and provide a way to print impressions
  constructor ({targetId, adDefinition, adRetrieved}) {
    super({responseType: AdResponse.NATIVE, targetId, adDefinition, adRetrieved})
  }
}
