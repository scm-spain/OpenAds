export default class EventDispatcher {
  constructor () {
    this._observers = new Map()
  }

  /**
   * @param {string} eventName
   * @param {string} position
   * @callback {observerCallback} observer function
   * @returns {Number}
   */
  addObserver ({eventName, position, observer}) {
    return this._getEventPositionObservers({eventName, position}).push(observer)
  }

  removeObserver ({eventName, position, observer}) {
    this._getEventPositionObservers({eventName, position}).filter(registeredObserver => registeredObserver !== observer)
  }

  dispatch ({eventName, position, payload}) {
    this._getEventPositionObservers({eventName, position}).forEach(observer => observer({payload}))
  }

  _getEventPositionObservers ({eventName, position}) {
    if (!this._observers.has(eventName)) {
      this._observers.set(eventName, new Map())
    }
    const eventMap = this._observers.get(eventName)
    if (!eventMap.has(position)) {
      eventMap.set(position, [])
    }
    return eventMap.get(position)
  }
}
