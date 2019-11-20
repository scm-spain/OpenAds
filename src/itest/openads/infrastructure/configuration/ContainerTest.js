import Container from '../../../../openads/infrastructure/configuration/Container'
import {JSDOM} from 'jsdom'

export default class ContainerTest extends Container {
  constructor({config, eager = true} = {}) {
    super({
      config,
      eager: false,
      currentWindow: new JSDOM(
        '<!DOCTYPE html><div id="forlayo">Hello world</div>',
        {
          url: 'http://localhost'
        }
      ).window
    })
    if (eager) super._buildEagerSingletonInstances()
  }
}
