import Container from './Container'
import {performanceHandler} from './performanceHandler'

export default class PerformanceContainer extends Container {
  constructor ({config, performance, window} = {}) {
    super({config, eager: false, currentWindow: window})
    this._performance = performance
    super._buildEagerSingletonInstances()
  }

  getInstance ({key}) {
    this._performance.mark(`Initializing instance ${key}`)
    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]())
      } catch (e) {
        throw new Error(`Error creating instance: ${key}`, e)
      }
    }
    this._performance.stop(`Initializing instance ${key}`)
    return new Proxy(this._instances.get(key), performanceHandler(this._performance))
  }
}
