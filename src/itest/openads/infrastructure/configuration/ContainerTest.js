import Container from '../../../../openads/infrastructure/configuration/Container'
import HTMLDOMDriver from '../../../../openads/infrastructure/service/HTMLDOMDriver'
import {JSDOM} from 'jsdom'

export default class ContainerTest extends Container {
  constructor ({config, eager = true} = {}) {
    super({
      config,
      eager: false,
      currentWindow: new HTMLDOMDriver({
        dom: new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window
      })
    })
    if (eager) super._buildEagerSingletonInstances()
  }

  _buildDOMDriver () {
    return this._currentWindow
  }
}
