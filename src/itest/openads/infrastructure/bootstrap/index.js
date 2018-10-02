import ContainerTest from '../configuration/ContainerTest'
import OpenAds from '../../../../openads/application/OpenAds'

export default class BootstrapTest {
  static init ({config}) {
    return new OpenAds({container: new ContainerTest({config})})
  }
}
