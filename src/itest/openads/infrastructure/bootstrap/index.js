import ContainerTest from '../configuration/ContainerTest'
import OpenAds from '../../../../openads/application/OpenAds'

export default class BootstrapTest {
  static init ({config, appNexusConnector, appNexusClient}) {
    return new OpenAds({container: new ContainerTest({config, appNexusConnector, appNexusClient})})
  }
}
