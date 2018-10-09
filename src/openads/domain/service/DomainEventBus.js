import {observerErrorThrown} from './observerErrorThrown'

class DomainEventBus {
  constructor() {
    this._observers = new Map()
  }

  register({eventName, observer}) {
    if (!eventName) {
      throw new Error('Event Name is required')
    }
    if (typeof observer !== 'function') {
      throw new Error('Observer must be a function')
    }
    if (!this._observers.has(eventName)) {
      this._observers.set(eventName, [observer])
    } else {
      this._observers.get(eventName).push(observer)
    }
  }

  raise({domainEvent}) {
    if (this._observers.has(domainEvent.eventName)) {
      this._observers.get(domainEvent.eventName).forEach(observer => {
        try {
          observer({
            event: domainEvent.eventName,
            payload: domainEvent.payload,
            dispatcher: data => this.raise({domainEvent: data})
          })
        } catch (err) {
          this.raise({
            domainEvent: observerErrorThrown({
              message: 'Error processing the observer.',
              error: err
            })
          })
        }
      })
    }
  }

  getNumberOfRegisteredEvents() {
    return this._observers.size
  }

  getNumberOfObserversRegisteredForAnEvent({eventName}) {
    return this._observers.has(eventName)
      ? this._observers.get(eventName).length
      : 0
  }

  clearAllObservers() {
    this._observers.clear()
  }
}
const domainEventBus = new DomainEventBus()
export default domainEventBus
