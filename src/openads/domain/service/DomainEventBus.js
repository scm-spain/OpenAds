export default class DomainEventBus {
  constructor () {
    this._observers = new Map()
  }

  static register ({eventName, observer}) {
    if (!eventName) {
      throw new Error('Event Name is required')
    }
    if (typeof observer !== 'function') {
      throw new Error('Observer must be a function')
    }
    if (!this._observers.has(eventName)) {
      this._observers.set(eventName, [observer])
    }
    this._observers.get(eventName).push(observer)
  }

  static raise ({domainEvent}) {
    this._observers.get(domainEvent.eventName).forEach(observer => observer({payload: domainEvent.payload}))
  }
}
