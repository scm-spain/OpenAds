import OpenAds from '../../../../openads/application/OpenAds'
import ContainerPerformance from '../configuration/ContainerPerformance'

export default class BootstrapPerformance {
  static init ({config, appNexusClient, performance}) {
    performance.mark('Initializing OpenAds Facade')
    const openAds = new OpenAds({container: new ContainerPerformance({config, appNexusClient, performance})})
    performance.stop('Initializing OpenAds Facade')
    return openAds
  }
}
