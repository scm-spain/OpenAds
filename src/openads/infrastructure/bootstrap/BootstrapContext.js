import PerformanceBootstrap from './PerformanceBootstrap'
import ProductionBootstrap from './ProductionBootstrap'

export default class BootstrapContext {
  static init ({config, performance, window} = {}) {
    if (performance) {
      return PerformanceBootstrap.init({config, performance, window})
    } else {
      return ProductionBootstrap.init({config})
    }
  }
}
