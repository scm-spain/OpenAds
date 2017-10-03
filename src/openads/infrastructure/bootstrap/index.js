import Container from '../configuration/Container'
import OpenAds from '../../application/OpenAds'

export default class Bootstrap {
  static init ({config}) {
    return new OpenAds({container: new Container({config})})
  }
}
