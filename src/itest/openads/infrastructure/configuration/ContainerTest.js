import Container from '../../../../openads/infrastructure/configuration/Container'
import HTMLDOMDriver from '../../../../openads/infrastructure/service/HTMLDOMDriver'
import {JSDOM} from 'jsdom'
// import AppNexusClient from "../../../../openads/infrastructure/connector/appnexus/AppNexusClient";

export default class ContainerTest extends Container {
  constructor ({config, appNexusConnector}) {
    super({config, eager: false})
    this._appNexusConnector = appNexusConnector
    super._buildEagerSingletonInstances()
  }

  _buildDOMDriver () {
    return new HTMLDOMDriver({dom: new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document})
  }

  _buildAppNexusConnector () {
    return this._appNexusConnector
  }

  // _buildAppNexusClient () {
  //   return AppNexusClient.build()
  // }
}
