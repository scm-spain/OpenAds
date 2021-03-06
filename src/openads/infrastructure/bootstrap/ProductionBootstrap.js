import OpenAds from '../../application/OpenAds'
import Container from '../configuration/Container'

export default class ProductionBootstrap {
  static init({config, window}) {
    return new OpenAds({
      container: new Container({config, currentWindow: window})
    })
  }
}
