import AdRepository from '../../domain/position/AdRepository'

const TIMEOUT_EXCEPTION = 'Something in appnexus consumer failed to set adResponse data'
const DEFAULT_TIMEOUT = 20000
const DEFAULT_WAIT = 50

export default class PullingAdRepository extends AdRepository {
  constructor ({wait = DEFAULT_WAIT, timeout = DEFAULT_TIMEOUT} = {}) {
    super()
    this._positions = new Map()
    this._wait = wait
    this._timeout = timeout
  }

  find ({id}) {
    return Promise.race([
      this._waitForData({id}),
      this._timeoutPromise()
    ])
  }

  save ({id, adResponse}) {
    this._positions.set(id, adResponse)
  }

  remove ({id}) {
    this._positions.delete(id)
  }

  _waitForData ({id}) {
    return Promise.resolve(id)
      .then(this._positions.get)
      .then(optionalPosition => optionalPosition || this._intervalPull(id))
  }

  _intervalPull (id) {
    return new Promise(resolve => {
      const stopper = setInterval(() => {
        if (this._positions.has(id)) {
          clearInterval(stopper)
          resolve(this._positions.get(id))
        }
      }, this._wait)
    })
  }

  _timeoutPromise () {
    return new Promise((resolve, reject) => {
      const wait = setTimeout(() => {
        clearTimeout(wait)
        reject(new Error(TIMEOUT_EXCEPTION))
      }, this._timeout)
    })
  }
}
