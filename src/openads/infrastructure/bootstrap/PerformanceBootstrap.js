import OpenAds from '../../application/OpenAds'
import PerformanceContainer from '../configuration/PerformanceContainer'

export default class PerformanceBootstrap {
  static init({config, performance, window}) {
    performance.mark('Initializing OpenAds Facade')
    const openAds = new OpenAds({
      container: new PerformanceContainer({config, performance, window})
    })
    performance.stop('Initializing OpenAds Facade')
    return openAds
  }
}
