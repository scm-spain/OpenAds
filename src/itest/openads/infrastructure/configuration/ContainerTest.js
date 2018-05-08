import Container from '../../../../openads/infrastructure/configuration/Container'
import HTMLDOMDriver from '../../../../openads/infrastructure/service/HTMLDOMDriver'
import {JSDOM} from 'jsdom'

export default class ContainerTest extends Container {
  constructor ({config, appNexusClient}) {
    super({config, eager: false})
    this._appNexusClient = appNexusClient
    super._buildEagerSingletonInstances()
  }

  _buildDOMDriver () {
    return new HTMLDOMDriver({dom: new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document})
  }

  _buildAppNexusClient () {
    return this._appNexusClient
  }
}
