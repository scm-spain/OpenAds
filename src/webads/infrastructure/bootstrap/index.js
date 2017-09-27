import Container from '../configuration/Container'
import WebAds from '../../application/WebAds'

export default class Bootstrap {
  static init ({config}) {
    return new WebAds({container: new Container({config})})
  }
}
