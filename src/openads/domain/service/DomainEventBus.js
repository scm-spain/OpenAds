class DomainEventBus {
  constructor () {
    this._observers = new Map()
  }

  register ({eventName, observer}) {
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

  raise ({domainEvent}) {
    this._observers
      .get(domainEvent.eventName)
      .forEach(observer => {
        try {
          observer({
            payload: domainEvent.payload,
            dispatcher: (data) => this.raise({domainEvent: data})
          })
        } catch (err) {
          const domainEvent = {
            eventName: ERROR_EVENT,
            payload: {
              message: 'Error processing the observer.',
              error: err
            }
          }
          this.raise({domainEvent})
        }
      })
  }

  getNumberOfRegisteredEvents () {
    return this._observers.size
  }

  getNumberOfObserversRegisteredForAnEvent ({eventName}) {
    let result = 0
    if (this._observers.get(eventName)) {
      result = this._observers.get(eventName).length
    }
    return result
  }

  clearAllObservers () {
    this._observers.clear()
  }
}
const ERROR_EVENT = 'ERROR_EVENT'
const domainEventBus = new DomainEventBus()
export default domainEventBus
