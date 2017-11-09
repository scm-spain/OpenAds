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
    if (!eventName) {
      throw new Error('Event Name is required')
    }
    if (!position) {
      throw new Error('Position is required')
    }
    if (typeof observer !== 'function') {
      throw new Error('Observer must be a function')
    }
    return this._getEventPositionObservers({eventName, position}).push(observer)
  }

  removeObserver ({eventName, position, observer}) {
    let eventMap = this._getEventMap({eventName})
    let positionObservers = this._getEventPositionObservers({eventName, position})
    eventMap.set(position, positionObservers.filter(registeredObserver => registeredObserver !== observer))
  }

  dispatch ({eventName, position, payload}) {
    this._getEventPositionObservers({eventName, position}).forEach(observer => observer({payload}))
  }

  _getEventMap ({eventName}) {
    if (!this._observers.has(eventName)) {
      this._observers.set(eventName, new Map())
    }
    return this._observers.get(eventName)
  }

  _getEventPositionObservers ({eventName, position}) {
    const eventMap = this._getEventMap({eventName})
    if (!eventMap.has(position)) {
      eventMap.set(position, [])
    }
    return eventMap.get(position)
  }
}
