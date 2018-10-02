import BootstrapContext from './BootstrapContext'

export default class Main {
  static init ({config, performance, window} = {}) {
    return BootstrapContext.init({config, performance, window})
  }
}
