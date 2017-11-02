export default class EventDispatcher {
  constructor () {
    this._observers = new Map()
  }

  /**
   *
   * @callback {observerFunction} observer function
   * @returns {Number}
   */
  addObserver ({eventName, observer}) {
    return this._observers[eventName].push(observer)
  }

  removeObserver ({eventName, observer}) {
    this._observers[eventName].filter(registeredObserver => registeredObserver !== observer)
  }

  dispatch ({eventName, payload}) {
    this._observers[eventName].forEach(observer => observer({payload}))
  }
}
