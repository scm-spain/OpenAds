export default class Adapter {
  constructor ({requestAdapter, responseAdapter}) {
    this._requestAdapter = requestAdapter
    this._responseAdapter = responseAdapter
  }
  get requestAdapter () {
    return this._requestAdapter
  }
  get responseAdapter () {
    return this._responseAdapter
  }
}
